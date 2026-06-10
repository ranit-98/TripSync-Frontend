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

const socketUrl = baseUrl || 'http://localhost:4000';

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
  const [typingUsersById, setTypingUsersById] = useState<Record<string, TypingUser>>({});
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

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

  const typingUsers = useMemo(() => Object.values(typingUsersById), [typingUsersById]);

  return {
    messages,
    notifyTyping,
    stopTyping,
    typingUsers,
  };
};
