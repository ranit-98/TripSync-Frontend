import { tripItineraryAssets } from '@/json/assets';
import CloseIcon from '@mui/icons-material/Close';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function InviteModal({ onClose }: { onClose: () => void }) {
  return (
    <Box className="invite_overlay">
      <Box className="invite_modal">
        <Box className="invite_header">
          <Typography component="h3">Invite to Bali Trip</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="invite_body">
          <Box className="invite_input_row">
            <label>EMAIL ADDRESS</label>
            <Stack direction="row">
              <input placeholder="e.g. sarah@travel.com" type="email" />
              <Button variant="contained">Send Invite</Button>
            </Stack>
          </Box>

          <Box className="invite_roles">
            <label>Choose Role</label>
            <Box className="role_grid">
              <label className="role_card active">
                <span className="role_icon primary">
                  <EditCalendarIcon />
                </span>
                <strong>Collaborator</strong>
                <small>Can edit itinerary, add activities, and invite others.</small>
              </label>
              <label className="role_card">
                <span className="role_icon secondary">
                  <VisibilityIcon />
                </span>
                <strong>Viewer</strong>
                <small>Can only view trip details and leave comments.</small>
              </label>
            </Box>
          </Box>

          <Box className="invite_members">
            <Typography>Shared with (4)</Typography>
            <Box className="member_item">
              <Stack direction="row">
                <Box className="member_avatar" component="img" src={tripItineraryAssets.members[0]} />
                <Box>
                  <strong>Elena Rodriguez</strong>
                  <small>elena.r@agency.com</small>
                </Box>
              </Stack>
              <span className="chip owner">Owner</span>
            </Box>
            <Box className="member_item">
              <Stack direction="row">
                <span className="member_initial">M</span>
                <Box>
                  <strong>Marcus Chen</strong>
                  <small>m.chen@outlook.com</small>
                </Box>
              </Stack>
              <Stack direction="row">
                <span className="chip">Collaborator</span>
                <IconButton size="small">
                  <PersonRemoveIcon />
                </IconButton>
              </Stack>
            </Box>
            <Box className="member_item">
              <Stack direction="row">
                <span className="member_initial tertiary">JS</span>
                <Box>
                  <strong>Jordan Smith</strong>
                  <small>jordan@explore.io</small>
                </Box>
              </Stack>
              <Stack direction="row">
                <span className="chip">Viewer</span>
                <IconButton size="small">
                  <PersonRemoveIcon />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box className="invite_footer">
          <Button onClick={onClose}>Done</Button>
        </Box>
      </Box>
    </Box>
  );
}
