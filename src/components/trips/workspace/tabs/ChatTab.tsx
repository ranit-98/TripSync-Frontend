'use client';

import { useChatAttach, useChatDelete, useChatHistory, useChatSend } from '@/api/hooks/chat/useChat.hooks';
import { useChatRealtime } from '@/api/hooks/chat/useChatRealtime';
import { useTripMembers } from '@/api/hooks/trips/useTrips.hooks';
import { useUploadsSign } from '@/api/hooks/uploads/useUploads.hooks';
import ReusableChat, {
  type ReusableChatMessage,
  type ReusableChatUser,
} from '@/components/chat/ReusableChat';
import { tripItineraryAssets } from '@/json/assets';
import { useAuthStore } from '@/store/auth/auth.store';
import { ChatSkeleton } from '@/components/skeleton';
import type { ICloudinaryUploadResponse, IMessage, ISignedUpload, ITripMember } from '@/typescript/interface/api';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

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

const uploadChatFile = async (file: File, signedUpload: ISignedUpload) => {
  if (!signedUpload.uploadUrl) {
    throw new Error('Upload URL missing.');
  }

  if (signedUpload.signature || signedUpload.apiKey) {
    const formData = new FormData();
    formData.append('file', file);
    if (signedUpload.apiKey) formData.append('api_key', signedUpload.apiKey);
    if (signedUpload.signature) formData.append('signature', signedUpload.signature);
    if (signedUpload.timestamp) formData.append('timestamp', String(signedUpload.timestamp));
    if (signedUpload.folder) formData.append('folder', signedUpload.folder);
    if (signedUpload.publicId) formData.append('public_id', signedUpload.publicId);

    const response = await fetch(signedUpload.uploadUrl, {
      body: formData,
      method: 'POST',
    });

    if (!response.ok) throw new Error('Upload failed.');

    const uploaded = (await response.json()) as ICloudinaryUploadResponse;
    return uploaded.secure_url || uploaded.url || '';
  }

  const response = await fetch(signedUpload.uploadUrl, {
    body: file,
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    method: 'PUT',
  });

  if (!response.ok) throw new Error('Upload failed.');

  return signedUpload.uploadUrl.split('?')[0];
};

export default function ChatTab({
  onInvite,
  tripId,
}: {
  onInvite?: () => void;
  tripId: string;
}) {
  const currentUser = useAuthStore((state) => state.user);
  const { data: membersResponse } = useTripMembers(tripId);
  const { data: messagesResponse, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useChatHistory(tripId);
  const sendMessage = useChatSend({ optionalCallback: () => undefined });
  const attachMessage = useChatAttach({ optionalCallback: () => undefined });
  const deleteMessage = useChatDelete({ optionalCallback: () => undefined });
  const signUpload = useUploadsSign({ optionalCallback: () => undefined });
  const apiMessages = useMemo(
    () => [...(messagesResponse?.pages ?? [])].reverse().flatMap((page) => toArray<IMessage>(page.data.data)),
    [messagesResponse?.pages]
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

  if (isLoading) {
    return <ChatSkeleton />;
  }

  return (
    <ReusableChat
      currentUserId={currentUser?.id}
      emptyText="No trip messages yet."
      fallbackAvatar={tripItineraryAssets.profile}
      isLoading={false}
      isSending={sendMessage.isPending}
      hasOlderMessages={hasNextPage}
      isLoadingOlderMessages={isFetchingNextPage}
      members={members}
      messages={realtimeMessages.length ? realtimeMessages : messages}
      onDeleteMessage={(message) => deleteMessage.mutate({ messageId: message.id, tripId })}
      onInviteMember={onInvite}
      onLoadOlderMessages={() => fetchNextPage()}
      onReactMessage={realtime.reactToMessage}
      onSendMessage={async (body, files = []) => {
        realtime.stopTyping();
        const messageResponse = await sendMessage.mutateAsync({ body: { body }, tripId });
        const messageId = messageResponse.data.data?.id;

        if (!messageId || !files.length) return;

        try {
          await Promise.all(
            files.map(async (file) => {
              const signedResponse = await signUpload.mutateAsync({
                body: { fileName: file.name, mimeType: file.type || 'application/octet-stream', target: 'chat' },
                tripId,
              });
              const signedUpload = signedResponse.data.data;
              if (!signedUpload) throw new Error('Upload signature missing.');

              const url = await uploadChatFile(file, signedUpload);
              if (!url) throw new Error('Uploaded file URL missing.');

              return attachMessage.mutateAsync({
                body: {
                  mimeType: file.type || 'application/octet-stream',
                  objectKey: signedUpload.objectKey || signedUpload.publicId || file.name,
                  originalFileName: file.name,
                  size: file.size,
                  url,
                },
                messageId,
                tripId,
              });
            })
          );
        } catch {
          toast.error('Message sent, but one attachment could not be uploaded.');
        }
      }}
      onTyping={realtime.notifyTyping}
      placeholder="Type a message to the group..."
      reactionsByMessageId={realtime.reactionsByMessageId}
      title="Trip Members"
      typingUsers={realtime.typingUsers}
    />
  );
}
