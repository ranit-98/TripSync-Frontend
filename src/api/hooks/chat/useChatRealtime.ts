'use client';

import { baseUrl } from '@/api/endpoints';
import type { IMessage, IUser } from '@/typescript/interface/api';
import { useEffect, useMemo, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

type TypingUser = Pick<IUser, 'avatarUrl' | 'id' | 'name'>;

type TypingPayload = {
  isTyping: boolean;
  tripId: string;
  user?: TypingUser;
};

type ReactionPayload = {
  clientId?: string;
  emoji: string;
  messageId: string;
  reactions?: string[];
  tripId: string;
  userId?: string;
};

const socketUrl = baseUrl || 'http://localhost:4000';

const getReactionStorageKey = (tripId: string) => `tripsync-chat-reactions:${tripId}`;

const readStoredReactions = (tripId: string) => {
  if (typeof window === 'undefined') return {};

  try {
    const value = window.localStorage.getItem(getReactionStorageKey(tripId));
    return value ? (JSON.parse(value) as Record<string, string[]>) : {};
  } catch {
    return {};
  }
};

const writeStoredReactions = (tripId: string, reactions: Record<string, string[]>) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(getReactionStorageKey(tripId), JSON.stringify(reactions));
};

const fetchSharedReactions = async (tripId: string) => {
  const response = await fetch(`/api/local-chat-reactions?tripId=${encodeURIComponent(tripId)}`, {
    cache: 'no-store',
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as { data?: Record<string, string[]> };

  return payload.data ?? {};
};

const postSharedReaction = async (tripId: string, messageId: string, emoji: string) => {
  const response = await fetch('/api/local-chat-reactions', {
    body: JSON.stringify({ emoji, messageId, tripId }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as { data?: Record<string, string[]> };

  return payload.data ?? {};
};

export const useChatRealtime = ({
  currentUser,
  initialMessages,
  tripId,
}: {
  currentUser: IUser | null;
  initialMessages: IMessage[];
  tripId: string;
}) => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const [reactionsByMessageId, setReactionsByMessageId] = useState<Record<string, string[]>>({});
  const [typingUsersById, setTypingUsersById] = useState<Record<string, TypingUser>>({});
  const clientIdRef = useRef(`chat-client-${Math.random().toString(36).slice(2)}`);
  const reactionChannelRef = useRef<BroadcastChannel | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const reactionPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (!tripId) return;

    setReactionsByMessageId(readStoredReactions(tripId));
  }, [tripId]);

  useEffect(() => {
    if (!tripId) return undefined;

    let cancelled = false;
    const syncReactions = async () => {
      const sharedReactions = await fetchSharedReactions(tripId);
      if (cancelled || !sharedReactions) return;

      setReactionsByMessageId(sharedReactions);
      writeStoredReactions(tripId, sharedReactions);
    };

    syncReactions();
    reactionPollRef.current = setInterval(syncReactions, 8000);

    return () => {
      cancelled = true;
      if (reactionPollRef.current) {
        clearInterval(reactionPollRef.current);
        reactionPollRef.current = null;
      }
    };
  }, [tripId]);

  useEffect(() => {
    if (!tripId || typeof BroadcastChannel === 'undefined') return undefined;

    const channel = new BroadcastChannel(`tripsync-chat-reactions:${tripId}`);
    reactionChannelRef.current = channel;

    channel.onmessage = (event: MessageEvent<ReactionPayload>) => {
      const payload = event.data;
      if (payload.clientId === clientIdRef.current || payload.tripId !== tripId || !payload.messageId) return;

      setReactionsByMessageId((current) => {
        const nextReactions = payload.reactions || [];
        const next = { ...current, [payload.messageId]: nextReactions };
        writeStoredReactions(tripId, next);

        return next;
      });
    };

    return () => {
      channel.close();
      reactionChannelRef.current = null;
    };
  }, [tripId]);

  useEffect(() => {
    if (!tripId) return;

    const socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.emit('chat:join', { tripId });
    socket.on('chat:message-created', (message: IMessage) => {
      setMessages((current) => {
        if (current.some((item) => item.id === message.id)) return current;

        return [...current, message];
      });
    });
    socket.on('chat:message-deleted', ({ messageId }: { messageId: string }) => {
      setMessages((current) => current.filter((message) => message.id !== messageId));
    });
    const handleReactionUpdated = (payload: ReactionPayload) => {
      if (payload.tripId !== tripId || !payload.messageId) return;

      setReactionsByMessageId((current) => {
        const currentReactions = current[payload.messageId] || [];
        const nextReactions =
          payload.reactions ||
          (currentReactions.includes(payload.emoji)
            ? currentReactions.filter((reaction) => reaction !== payload.emoji)
            : [...currentReactions, payload.emoji]);
        const next = { ...current, [payload.messageId]: nextReactions };
        writeStoredReactions(tripId, next);

        return next;
      });
    };

    socket.on('chat:reaction-updated', handleReactionUpdated);
    socket.on('chat:message-reaction-updated', handleReactionUpdated);
    socket.on('chat:typing', (payload: TypingPayload) => {
      if (!payload.user?.id || payload.user.id === currentUser?.id) return;

      setTypingUsersById((current) => {
        const next = { ...current };
        const typingUser = payload.user;

        if (!typingUser?.id) return next;

        if (payload.isTyping) {
          next[typingUser.id] = typingUser;
        } else {
          delete next[typingUser.id];
        }

        return next;
      });
    });

    return () => {
      socket.emit('chat:leave', { tripId });
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUser?.id, tripId]);

  const emitTyping = (isTyping: boolean) => {
    if (!currentUser?.id || !tripId) return;

    socketRef.current?.emit('chat:typing', {
      isTyping,
      tripId,
      user: {
        avatarUrl: currentUser.avatarUrl,
        id: currentUser.id,
        name: currentUser.name || currentUser.email || 'Trip member',
      },
    });
  };

  const notifyTyping = () => {
    emitTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => emitTyping(false), 1200);
  };

  const stopTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    emitTyping(false);
  };

  const reactToMessage = async (messageId: string, emoji: string) => {
    if (!messageId || !emoji) return;

    let optimisticReactions: Record<string, string[]> = {};
    setReactionsByMessageId((current) => {
      const currentReactions = current[messageId] || [];
      const nextReactions = currentReactions.includes(emoji)
        ? currentReactions.filter((reaction) => reaction !== emoji)
        : [...currentReactions, emoji];
      const next = { ...current, [messageId]: nextReactions };
      optimisticReactions = next;
      writeStoredReactions(tripId, next);

      return next;
    });

    socketRef.current?.emit('chat:reaction', {
      clientId: clientIdRef.current,
      emoji,
      messageId,
      tripId,
      userId: currentUser?.id,
    });
    socketRef.current?.emit('chat:message-reaction', {
      clientId: clientIdRef.current,
      emoji,
      messageId,
      tripId,
      userId: currentUser?.id,
    });
    reactionChannelRef.current?.postMessage({
      clientId: clientIdRef.current,
      emoji,
      messageId,
      reactions: optimisticReactions[messageId] || [],
      tripId,
      userId: currentUser?.id,
    });
    const sharedReactions = await postSharedReaction(tripId, messageId, emoji);
    if (sharedReactions) {
      setReactionsByMessageId(sharedReactions);
      writeStoredReactions(tripId, sharedReactions);
      reactionChannelRef.current?.postMessage({
        clientId: clientIdRef.current,
        emoji,
        messageId,
        reactions: sharedReactions[messageId] || [],
        tripId,
        userId: currentUser?.id,
      });
    }
  };

  const typingUsers = useMemo(() => Object.values(typingUsersById), [typingUsersById]);

  return {
    messages,
    notifyTyping,
    reactionsByMessageId,
    reactToMessage,
    stopTyping,
    typingUsers,
  };
};
