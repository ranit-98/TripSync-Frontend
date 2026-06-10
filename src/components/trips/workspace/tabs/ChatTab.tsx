'use client';

import { useChatDelete, useChatHistory, useChatSend } from '@/api/hooks/chat/useChat.hooks';
import { useChatRealtime } from '@/api/hooks/chat/useChatRealtime';
import { useTripMembers } from '@/api/hooks/trips/useTrips.hooks';
import ReusableChat, {
  type ReusableChatMessage,
  type ReusableChatUser,
} from '@/components/chat/ReusableChat';
import { tripItineraryAssets } from '@/json/assets';
import { useAuthStore } from '@/store/auth/auth.store';
import type { IMessage, ITripMember } from '@/typescript/interface/api';
import { useMemo } from 'react';

const toArray = <T,>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidates = [record.messages, record.members, record.items, record.data];
    const arrayValue = candidates.find(Array.isArray);

    if (arrayValue) return arrayValue as T[];
  }

  return [];
};

const getUserName = (name?: string, email?: string) => name || email || 'Trip member';

export default function ChatTab({
  onInvite,
  tripId,
}: {
  onInvite?: () => void;
  tripId: string;
}) {
  const currentUser = useAuthStore((state) => state.user);
  const { data: membersResponse } = useTripMembers(tripId);
  const { data: messagesResponse, isLoading } = useChatHistory(tripId);
  const sendMessage = useChatSend({ optionalCallback: () => undefined });
  const deleteMessage = useChatDelete({ optionalCallback: () => undefined });
  const apiMessages = useMemo(
    () => toArray<IMessage>(messagesResponse?.data.data),
    [messagesResponse?.data.data]
  );
  const members = useMemo<ReusableChatUser[]>(
    () =>
      toArray<ITripMember>(membersResponse?.data.data)
        .map((member) => member.user)
        .filter((user): user is NonNullable<typeof user> => Boolean(user?.id))
        .map((user) => ({
          avatarUrl: user.avatarUrl,
          id: user.id,
          name: getUserName(user.name, user.email),
          status: user.id === currentUser?.id ? 'Active now' : 'Trip member',
        })),
    [currentUser?.id, membersResponse?.data.data]
  );
  const messages = useMemo<ReusableChatMessage[]>(
    () =>
      apiMessages.map((message) => ({
        attachments: message.attachments?.map((attachment) => ({
          id: attachment.id,
          mimeType: attachment.mimeType,
          name: attachment.originalFileName,
          url: attachment.url,
        })),
        body: message.body,
        createdAt: message.createdAt,
        id: message.id,
        sender: message.sender
          ? {
              avatarUrl: message.sender.avatarUrl,
              id: message.sender.id,
              name: getUserName(message.sender.name, message.sender.email),
            }
          : null,
        senderId: message.senderId,
      })),
    [apiMessages]
  );
  const realtime = useChatRealtime({
    currentUser,
    initialMessages: apiMessages,
    tripId,
  });
  const realtimeMessages = useMemo<ReusableChatMessage[]>(
    () =>
      realtime.messages.map((message) => ({
        attachments: message.attachments?.map((attachment) => ({
          id: attachment.id,
          mimeType: attachment.mimeType,
          name: attachment.originalFileName,
          url: attachment.url,
        })),
        body: message.body,
        createdAt: message.createdAt,
        id: message.id,
        sender: message.sender
          ? {
              avatarUrl: message.sender.avatarUrl,
              id: message.sender.id,
              name: getUserName(message.sender.name, message.sender.email),
            }
          : null,
        senderId: message.senderId,
      })),
    [realtime.messages]
  );

  return (
    <ReusableChat
      currentUserId={currentUser?.id}
      emptyText="No trip messages yet."
      fallbackAvatar={tripItineraryAssets.profile}
      isLoading={isLoading}
      isSending={sendMessage.isPending}
      members={members}
      messages={realtimeMessages.length ? realtimeMessages : messages}
      onDeleteMessage={(message) => deleteMessage.mutate({ messageId: message.id, tripId })}
      onInviteMember={onInvite}
      onSendMessage={(body) => {
        realtime.stopTyping();
        sendMessage.mutate({ body: { body }, tripId });
      }}
      onTyping={realtime.notifyTyping}
      placeholder="Type a message to the group..."
      title="Trip Members"
      typingUsers={realtime.typingUsers}
    />
  );
}
