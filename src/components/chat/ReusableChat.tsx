'use client';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MicIcon from '@mui/icons-material/Mic';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

const VoiceNoteAttachment = dynamic(() => import('./VoiceNoteAttachment'), { ssr: false });
const VoiceRecorderComposer = dynamic(() => import('./VoiceRecorderComposer'), { ssr: false });

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
  hasOlderMessages?: boolean;
  isLoadingOlderMessages?: boolean;
  members: ReusableChatUser[];
  messages: ReusableChatMessage[];
  onDeleteMessage?: (message: ReusableChatMessage) => void;
  onInviteMember?: () => void;
  onLoadOlderMessages?: () => void;
  onReactMessage?: (messageId: string, emoji: string) => void;
  onSendMessage: (body: string, files?: File[]) => Promise<void> | void;
  onTyping?: () => void;
  placeholder?: string;
  reactionsByMessageId?: Record<string, string[]>;
  title?: string;
  typingUsers?: ReusableChatUser[];
};

type PendingFile = {
  file: File;
  id: string;
  previewUrl?: string;
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

const emojiOptions = ['👍', '❤️', '😂', '🔥', '🙏', '🎉'];

const getFileKind = (file: File) => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('audio/')) return 'audio';

  return 'file';
};

const attachmentOnlyText = 'Shared an attachment';

const getDisplayBody = (message: ReusableChatMessage) => {
  if (message.body === attachmentOnlyText && message.attachments?.length) return '';

  return message.body;
};

const getQuotedBody = (message: ReusableChatMessage) => {
  const body = getDisplayBody(message) || message.attachments?.[0]?.name || 'Attachment';

  return body.length > 88 ? `${body.slice(0, 88)}...` : body;
};

const parseReplyBody = (body: string) => {
  const match = body.match(/^Replying to (.+?): "([\s\S]*?)"\n([\s\S]*)$/);

  if (!match) return { text: body };

  return {
    quoteAuthor: match[1],
    quoteText: match[2],
    text: match[3],
  };
};

const getMentionMatch = (value: string) => value.match(/(^|\s)@([A-Za-z0-9_]*)$/);

export default function ReusableChat({
  currentUserId,
  emptyText = 'No messages yet.',
  fallbackAvatar,
  isLoading = false,
  isSending = false,
  hasOlderMessages = false,
  isLoadingOlderMessages = false,
  members,
  messages,
  onDeleteMessage,
  onInviteMember,
  onLoadOlderMessages,
  onReactMessage,
  onSendMessage,
  onTyping,
  placeholder = 'Type a message...',
  reactionsByMessageId,
  title = 'Members',
  typingUsers = [],
}: ReusableChatProps) {
  const [draft, setDraft] = useState('');
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [replyTo, setReplyTo] = useState<ReusableChatMessage | null>(null);
  const [reactions, setReactions] = useState<Record<string, string[]>>({});
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pendingFilesRef = useRef<PendingFile[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const visibleMessages = messages;
  const groupedMessages = useMemo(() => {
    return visibleMessages.reduce<Array<{ date: string; items: ReusableChatMessage[] }>>((groups, message) => {
      const date = formatDateChip(message.createdAt);
      const lastGroup = groups[groups.length - 1];

      if (lastGroup?.date === date) {
        lastGroup.items.push(message);
      } else {
        groups.push({ date, items: [message] });
      }

      return groups;
    }, []);
  }, [visibleMessages]);
  const filteredMentionMembers = useMemo(() => {
    const query = mentionQuery.toLowerCase();

    if (!query) return members;

    return members.filter((member) => member.name.toLowerCase().includes(query));
  }, [members, mentionQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  useEffect(() => {
    pendingFilesRef.current = pendingFiles;
  }, [pendingFiles]);

  useEffect(() => {
    return () => {
      pendingFilesRef.current.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  const loadOlderMessages = () => {
    if (!hasOlderMessages || isLoadingOlderMessages) return;

    onLoadOlderMessages?.();
  };

  const addFiles = (files: FileList | File[]) => {
    const nextFiles = Array.from(files).map((file) => ({
      file,
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setPendingFiles((current) => [...current, ...nextFiles]);
  };

  const removePendingFile = (id: string) => {
    setPendingFiles((current) => {
      const target = current.find((item) => item.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);

      return current.filter((item) => item.id !== id);
    });
  };

  const insertText = (value: string) => {
    setDraft((current) => (current ? `${current} ${value}` : value));
    onTyping?.();
  };

  const handleDraftChange = (value: string) => {
    setDraft(value);
    onTyping?.();

    const mentionMatch = getMentionMatch(value);
    setMentionQuery(mentionMatch?.[2] || '');
    setShowMentionMenu(Boolean(mentionMatch));
    if (mentionMatch) setShowEmojiMenu(false);
  };

  const insertMention = (member: ReusableChatUser) => {
    const mention = `@${member.name.replace(/\s+/g, '')}`;

    setDraft((current) => {
      if (getMentionMatch(current)) {
        return current.replace(/(^|\s)@([A-Za-z0-9_]*)$/, `$1${mention} `);
      }

      return current ? `${current} ${mention} ` : `${mention} `;
    });
    setMentionQuery('');
    setShowMentionMenu(false);
    onTyping?.();
  };

  const toggleReaction = (messageId: string, emoji: string) => {
    onReactMessage?.(messageId, emoji);
    if (onReactMessage) return;

    setReactions((current) => {
      const currentReactions = current[messageId] || [];
      const hasReaction = currentReactions.includes(emoji);

      return {
        ...current,
        [messageId]: hasReaction
          ? currentReactions.filter((reaction) => reaction !== emoji)
          : [...currentReactions, emoji],
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = draft.trim();
    if ((!body && !pendingFiles.length) || isSending) return;

    const messageBody = replyTo
      ? `Replying to ${getSenderName(replyTo, currentUserId)}: "${getQuotedBody(replyTo)}"\n${body}`
      : body;
    const files = pendingFiles.map((item) => item.file);

    await onSendMessage(messageBody || 'Shared an attachment', files);
    setDraft('');
    setReplyTo(null);
    setPendingFiles((current) => {
      current.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });

      return [];
    });
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
        <Box
          className="messages"
          onScroll={(event) => {
            if (event.currentTarget.scrollTop <= 24) loadOlderMessages();
          }}
        >
          {isLoading ? (
            <Box className="empty_inline">Loading messages...</Box>
          ) : groupedMessages.length ? (
            <>
              {(hasOlderMessages || isLoadingOlderMessages) && (
                <Box className="older_messages_loader">
                  {isLoadingOlderMessages ? (
                    <>
                      <span />
                      <span />
                      <span />
                    </>
                  ) : (
                    <button onClick={loadOlderMessages} type="button">
                      Load older messages
                    </button>
                  )}
                </Box>
              )}
              {groupedMessages.map((group) => (
                <Box className="message_group" key={group.date}>
                  <span className="date_chip">{group.date}</span>
                  {group.items.map((message) => {
                  const outgoing = message.senderId === currentUserId;
                  const parsedBody = parseReplyBody(getDisplayBody(message));
                  const hasBubbleContent = Boolean(
                    parsedBody.quoteAuthor || parsedBody.quoteText || parsedBody.text
                  );
                  const messageReactions = reactionsByMessageId?.[message.id] || reactions[message.id] || [];

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
                        <Box className="message_surface">
                          {hasBubbleContent && (
                            <Box className="message_bubble">
                              {parsedBody.quoteAuthor && parsedBody.quoteText && (
                                <Box className="quoted_message">
                                  <strong>{parsedBody.quoteAuthor}</strong>
                                  <span>{parsedBody.quoteText}</span>
                                </Box>
                              )}
                              {parsedBody.text && <p>{parsedBody.text}</p>}
                            </Box>
                          )}
                          {message.attachments?.map((attachment) =>
                            attachment.mimeType?.startsWith('audio/') ? (
                              <VoiceNoteAttachment
                                key={attachment.id || attachment.url}
                                name={attachment.name}
                                url={attachment.url}
                              />
                            ) : (
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
                            )
                          )}
                          {messageReactions.length ? (
                            <Stack className="reaction_summary" direction="row">
                              {messageReactions.map((emoji) => (
                                <span key={emoji}>{emoji}</span>
                              ))}
                            </Stack>
                          ) : null}
                          <Stack className="message_actions" direction="row">
                            <Tooltip title="Reply">
                              <IconButton aria-label="Reply to message" onClick={() => setReplyTo(message)}>
                                <ReplyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            {emojiOptions.slice(0, 4).map((emoji) => (
                              <button
                                aria-label={`React with ${emoji}`}
                                className="reaction_btn"
                                key={emoji}
                                onClick={() => toggleReaction(message.id, emoji)}
                                type="button"
                              >
                                {emoji}
                              </button>
                            ))}
                            {outgoing && onDeleteMessage && (
                              <Tooltip title="Delete message">
                                <IconButton
                                  aria-label="Delete message"
                                  className="message_delete_btn"
                                  onClick={() => onDeleteMessage(message)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Box>
                  );
                  })}
                </Box>
              ))}
            </>
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
          {replyTo && (
            <Box className="reply_preview">
              <Box>
                <strong>Replying to {getSenderName(replyTo, currentUserId)}</strong>
                <span>{getQuotedBody(replyTo)}</span>
              </Box>
              <IconButton aria-label="Cancel reply" onClick={() => setReplyTo(null)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {pendingFiles.length > 0 && (
            <Stack className="pending_files" direction="row">
              {pendingFiles.map((item) => {
                const kind = getFileKind(item.file);

                return (
                  <Box className={`pending_file ${kind}`} key={item.id}>
                    {item.previewUrl ? (
                      <Box alt={item.file.name} component="img" src={item.previewUrl} />
                    ) : kind === 'audio' ? (
                      <MicIcon />
                    ) : (
                      <InsertDriveFileIcon />
                    )}
                    <span>{item.file.name}</span>
                    <IconButton aria-label="Remove attachment" onClick={() => removePendingFile(item.id)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                );
              })}
            </Stack>
          )}
          {showVoiceRecorder ? (
            <VoiceRecorderComposer
              onCancel={() => setShowVoiceRecorder(false)}
              onSend={async (file) => {
                const body = draft.trim();
                const messageBody = replyTo
                  ? `Replying to ${getSenderName(replyTo, currentUserId)}: "${getQuotedBody(replyTo)}"\n${body}`
                  : body;

                setShowVoiceRecorder(false);
                await onSendMessage(messageBody || attachmentOnlyText, [file]);
                setDraft('');
                setReplyTo(null);
              }}
            />
          ) : (
            <>
              <textarea
                disabled={isSending}
                onChange={(event) => {
                  handleDraftChange(event.target.value);
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
                  <Box className="composer_tool">
                    <Tooltip title="Emoji">
                      <IconButton
                        aria-label="Emoji"
                        onClick={() => {
                          setShowEmojiMenu((value) => !value);
                          setShowMentionMenu(false);
                        }}
                      >
                        <SentimentSatisfiedAltIcon />
                      </IconButton>
                    </Tooltip>
                    {showEmojiMenu && (
                      <Stack className="composer_popover" direction="row">
                        {emojiOptions.map((emoji) => (
                          <button
                            aria-label={`Insert ${emoji}`}
                            key={emoji}
                            onClick={() => {
                              insertText(emoji);
                              setShowEmojiMenu(false);
                            }}
                            type="button"
                          >
                            {emoji}
                          </button>
                        ))}
                      </Stack>
                    )}
                  </Box>
                  <Tooltip title="Attach file">
                    <IconButton aria-label="Attach file" onClick={() => fileInputRef.current?.click()}>
                      <AttachFileIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Attach image">
                    <IconButton aria-label="Attach image" onClick={() => imageInputRef.current?.click()}>
                      <ImageIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Record voice note">
                    <IconButton aria-label="Record voice note" onClick={() => setShowVoiceRecorder(true)}>
                      <MicIcon />
                    </IconButton>
                  </Tooltip>
                  <Box className="composer_tool">
                    <Tooltip title="Mention member">
                      <IconButton
                        aria-label="Mention member"
                        onClick={() => {
                          setShowMentionMenu((value) => !value);
                          setMentionQuery('');
                          setShowEmojiMenu(false);
                        }}
                      >
                        @
                      </IconButton>
                    </Tooltip>
                    {showMentionMenu && (
                      <Stack className="mention_popover">
                        {filteredMentionMembers.map((member) => (
                          <button key={member.id} onClick={() => insertMention(member)} type="button">
                            <Box alt={member.name} component="img" src={member.avatarUrl || fallbackAvatar} />
                            <span>{member.id === currentUserId ? 'You' : member.name}</span>
                          </button>
                        ))}
                        {!filteredMentionMembers.length && <span className="mention_empty">No members found</span>}
                      </Stack>
                    )}
                  </Box>
                </Stack>
                <Button
                  className="send_btn"
                  disabled={isSending || (!draft.trim() && !pendingFiles.length)}
                  endIcon={<SendIcon />}
                  type="submit"
                >
                  {isSending ? 'Sending...' : 'Send'}
                </Button>
              </Box>
            </>
          )}
          <input
            hidden
            multiple
            onChange={(event) => {
              if (event.target.files) addFiles(event.target.files);
              event.target.value = '';
            }}
            ref={fileInputRef}
            type="file"
          />
          <input
            accept="image/*"
            hidden
            multiple
            onChange={(event) => {
              if (event.target.files) addFiles(event.target.files);
              event.target.value = '';
            }}
            ref={imageInputRef}
            type="file"
          />
        </Box>
      </Box>
    </Box>
  );
}
