'use client';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import MicIcon from '@mui/icons-material/Mic';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

export type ReusableChatUser = {
  avatarUrl?: string | null;
  id: string;
  name: string;
  status?: string;
};

export type ReusableChatAttachment = {
  id?: string;
  mimeType?: string;
  name?: string;
  url: string;
};

export type ReusableChatMessage = {
  attachments?: ReusableChatAttachment[];
  body: string;
  createdAt?: string;
  id: string;
  sender?: ReusableChatUser | null;
  senderId: string;
};

type ReusableChatProps = {
  currentUserId?: string;
  emptyText?: string;
  fallbackAvatar: string;
  isLoading?: boolean;
  isSending?: boolean;
  members: ReusableChatUser[];
  messages: ReusableChatMessage[];
  onDeleteMessage?: (message: ReusableChatMessage) => void;
  onInviteMember?: () => void;
  onSendMessage: (body: string) => void;
  onTyping?: () => void;
  placeholder?: string;
  title?: string;
  typingUsers?: ReusableChatUser[];
};

const formatDateChip = (value?: string) => {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) return 'Recent';

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const formatMessageTime = (value?: string) => {
  const date = value ? new Date(value) : null;

  if (!date || Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

const getSenderName = (message: ReusableChatMessage, currentUserId?: string) => {
  if (message.senderId === currentUserId) return 'You';

  return message.sender?.name || 'Trip member';
};

export default function ReusableChat({
  currentUserId,
  emptyText = 'No messages yet.',
  fallbackAvatar,
  isLoading = false,
  isSending = false,
  members,
  messages,
  onDeleteMessage,
  onInviteMember,
  onSendMessage,
  onTyping,
  placeholder = 'Type a message...',
  title = 'Members',
  typingUsers = [],
}: ReusableChatProps) {
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const groupedMessages = useMemo(() => {
    return messages.reduce<Array<{ date: string; items: ReusableChatMessage[] }>>((groups, message) => {
      const date = formatDateChip(message.createdAt);
      const lastGroup = groups[groups.length - 1];

      if (lastGroup?.date === date) {
        lastGroup.items.push(message);
      } else {
        groups.push({ date, items: [message] });
      }

      return groups;
    }, []);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = draft.trim();
    if (!body || isSending) return;

    onSendMessage(body);
    setDraft('');
  };

  return (
    <Box className="chat_shell">
      <Box className="chat_members">
        <Typography className="eyebrow">{title}</Typography>
        <Stack className="member_list">
          {members.map((member) => {
            const active = member.id === currentUserId;

            return (
              <Stack className={`chat_member${active ? ' active' : ''}`} direction="row" key={member.id}>
                <Box className="chat_avatar_wrap">
                  <Box
                    alt={member.name}
                    className="chat_avatar"
                    component="img"
                    src={member.avatarUrl || fallbackAvatar}
                  />
                  <span className="online" />
                </Box>
                <Box>
                  <strong>{active ? 'You' : member.name}</strong>
                  <small>{member.status || (active ? 'Active now' : 'Trip member')}</small>
                </Box>
              </Stack>
            );
          })}
        </Stack>
        {onInviteMember && (
          <Button className="invite_member_btn" onClick={onInviteMember} startIcon={<PersonAddIcon />}>
            Invite Member
          </Button>
        )}
      </Box>

      <Box className="chat_window">
        <Box className="messages">
          {isLoading ? (
            <Box className="empty_inline">Loading messages...</Box>
          ) : groupedMessages.length ? (
            groupedMessages.map((group) => (
              <Box className="message_group" key={group.date}>
                <span className="date_chip">{group.date}</span>
                {group.items.map((message) => {
                  const outgoing = message.senderId === currentUserId;

                  return (
                    <Box className={`message ${outgoing ? 'outgoing' : 'incoming'}`} key={message.id}>
                      {!outgoing && (
                        <Box
                          alt={message.sender?.name || 'Member'}
                          className="message_avatar"
                          component="img"
                          src={message.sender?.avatarUrl || fallbackAvatar}
                        />
                      )}
                      <Box className="message_bubble_wrap">
                        <small>
                          {getSenderName(message, currentUserId)}
                          {message.createdAt ? ` - ${formatMessageTime(message.createdAt)}` : ''}
                        </small>
                        <p>{message.body}</p>
                        {message.attachments?.map((attachment) => (
                          <a
                            className="message_attachment"
                            href={attachment.url}
                            key={attachment.id || attachment.url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {attachment.mimeType?.startsWith('image/') ? (
                              <Box alt={attachment.name || 'Attachment'} component="img" src={attachment.url} />
                            ) : (
                              attachment.name || 'Attachment'
                            )}
                          </a>
                        ))}
                      </Box>
                      {outgoing && onDeleteMessage && (
                        <IconButton
                          aria-label="Delete message"
                          className="message_delete_btn"
                          onClick={() => onDeleteMessage(message)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  );
                })}
              </Box>
            ))
          ) : (
            <Box className="empty_inline">{emptyText}</Box>
          )}
          {typingUsers.length > 0 && (
            <Box className="typing_row">
              <Box
                alt={typingUsers[0].name}
                className="typing_avatar"
                component="img"
                src={typingUsers[0].avatarUrl || fallbackAvatar}
              />
              <span>
                {typingUsers.length === 1
                  ? `${typingUsers[0].name} is typing`
                  : `${typingUsers.length} people are typing`}
              </span>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box className="message_input" component="form" onSubmit={handleSubmit}>
          <textarea
            disabled={isSending}
            onChange={(event) => {
              setDraft(event.target.value);
              onTyping?.();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder={placeholder}
            rows={1}
            value={draft}
          />
          <Box className="input_actions">
            <Stack direction="row">
              <IconButton disabled>
                <SentimentSatisfiedAltIcon />
              </IconButton>
              <IconButton disabled>
                <AttachFileIcon />
              </IconButton>
              <IconButton disabled>
                <ImageIcon />
              </IconButton>
              <IconButton disabled>
                <MicIcon />
              </IconButton>
            </Stack>
            <Button className="send_btn" disabled={isSending || !draft.trim()} endIcon={<SendIcon />} type="submit">
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
