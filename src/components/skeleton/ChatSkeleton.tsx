'use client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const memberRows = [0, 1, 2, 3, 4];
const messages = [
  { align: 'left', width: '52%' },
  { align: 'right', width: '46%' },
  { align: 'left', width: '64%' },
  { align: 'right', width: '38%' },
  { align: 'left', width: '48%' },
] as const;

export default function ChatSkeleton() {
  return (
    <Box className="chat_shell" aria-busy="true" aria-label="Loading trip chat">
      <Box className="chat_members">
        <Box>
          <Skeleton height={32} width={150} />
          <Skeleton height={20} width={210} />
        </Box>

        <Box className="member_list">
          {memberRows.map((row) => (
            <Box className={`chat_member${row === 0 ? ' active' : ''}`} key={row}>
              <Box className="chat_avatar_wrap">
                <Skeleton className="chat_avatar" variant="circular" />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton height={22} width={row === 0 ? '64%' : '76%'} />
                <Skeleton height={18} width="48%" />
              </Box>
            </Box>
          ))}
        </Box>

        <Skeleton className="invite_member_btn" variant="rounded" />
      </Box>

      <Box className="chat_window">
        <Box className="messages">
          <Skeleton className="date_chip" height={26} variant="rounded" width={120} />

          <Box className="message_group">
            {messages.map((message, index) => (
              <Box
                className={`message ${message.align === 'right' ? 'outgoing' : 'incoming'}`}
                key={`${message.align}-${index}`}
                sx={{ alignSelf: message.align === 'right' ? 'flex-end' : 'flex-start', width: message.width }}
              >
                {message.align === 'left' && <Skeleton className="message_avatar" height={36} variant="circular" width={36} />}
                <Box className="message_content" sx={{ flex: 1 }}>
                  {message.align === 'left' && <Skeleton height={18} width={90} />}
                  <Box className="message_bubble">
                    <Skeleton height={18} width="88%" />
                    <Skeleton height={18} width="62%" />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="message_input">
          <Skeleton height={48} variant="rounded" width="100%" />
          <Box className="input_actions">
            <Skeleton height={38} variant="rounded" width={168} />
            <Skeleton height={38} variant="rounded" width={96} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
