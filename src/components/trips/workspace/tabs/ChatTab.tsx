import { tripItineraryAssets } from '@/json/assets';
import AttachFileIcon from '@mui/icons-material/AttachFile';
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
import { chatMembers } from '../shared';

export default function ChatTab() {
  return (
    <Box className="chat_shell">
      <Box className="chat_members">
        <Typography className="eyebrow">Trip Members</Typography>
        <Stack className="member_list">
          {chatMembers.map((member) => (
            <Stack className={`chat_member${member.active ? ' active' : ''}`} direction="row" key={member.name}>
              <Box className="chat_avatar_wrap">
                <Box alt="" className={`chat_avatar${member.online ? '' : ' away'}`} component="img" src={member.avatar} />
                <span className={member.online ? 'online' : 'away'} />
              </Box>
              <Box>
                <strong>{member.name}</strong>
                <small>{member.status}</small>
              </Box>
            </Stack>
          ))}
        </Stack>
        <Button className="invite_member_btn" startIcon={<PersonAddIcon />}>
          Invite Member
        </Button>
      </Box>

      <Box className="chat_window">
        <Box className="messages">
          <span className="date_chip">August 14th, 2023</span>
          <Box className="message incoming">
            <Box alt="" className="message_avatar" component="img" src={tripItineraryAssets.members[1]} />
            <Box>
              <small>Marcus Chen - 10:24 AM</small>
              <p>Hey guys! I just saw this amazing villa in Positano. Should we book it before someone else does?</p>
            </Box>
          </Box>
          <Box className="media_message">
            <Box alt="Villa in Positano" component="img" src={tripItineraryAssets.hero} />
            <Stack direction="row">
              <strong>Villa Fiorella - Positano</strong>
              <span>$450/night</span>
            </Stack>
          </Box>
          <Box className="message outgoing">
            <small>You - 10:28 AM</small>
            <p>Wow, that looks incredible! I am definitely in. Let&apos;s check with Priya and Alex.</p>
          </Box>
          <Box className="message incoming">
            <Box alt="" className="message_avatar" component="img" src={tripItineraryAssets.members[0]} />
            <Box>
              <small>Priya Sharma - 10:30 AM</small>
              <p>Agreed! Checking the dates now. Looks like it is available for our full stay.</p>
            </Box>
          </Box>
          <Box className="typing_row">
            <Box alt="" className="typing_avatar" component="img" src={tripItineraryAssets.members[0]} />
            <span>Priya is typing</span>
          </Box>
        </Box>
        <Box className="message_input">
          <textarea placeholder="Type a message to the group..." rows={1} />
          <Box className="input_actions">
            <Stack direction="row">
              <IconButton>
                <SentimentSatisfiedAltIcon />
              </IconButton>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <IconButton>
                <ImageIcon />
              </IconButton>
              <IconButton>
                <MicIcon />
              </IconButton>
            </Stack>
            <Button className="send_btn" endIcon={<SendIcon />}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
