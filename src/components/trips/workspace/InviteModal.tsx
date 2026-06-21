import { useTripsInvite } from '@/api/hooks/trips/useTrips.hooks';
import { useUsersSearch } from '@/api/hooks/users/useUsers.hooks';
import type { ITrip, ITripMember, TripRole } from '@/typescript/interface/api';
import CloseIcon from '@mui/icons-material/Close';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormEvent, useMemo, useState } from 'react';

type InviteModalProps = {
  members: ITripMember[];
  onClose: () => void;
  trip?: ITrip | null;
  tripId: string;
};

const getInitials = (name?: string, email?: string) => {
  const source = name?.trim() || email?.trim() || '?';
  const words = source.split(/\s+/).filter(Boolean);

  if (words.length > 1) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
};

export default function InviteModal({ members, onClose, trip, tripId }: InviteModalProps) {
  const [email, setEmail] = useState('');
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [role, setRole] = useState<TripRole>('collaborator');
  const sortedMembers = useMemo(() => {
    return [...members].sort((firstMember, secondMember) => {
      if (firstMember.role === secondMember.role) {
        return 0;
      }

      return firstMember.role === 'collaborator' ? -1 : 1;
    });
  }, [members]);
  const { mutate: inviteMember, isPending } = useTripsInvite({
    optionalCallback: () => {
      setEmail('');
    },
  });
  const { data: usersResponse, isFetching: isSearchingUsers } = useUsersSearch(email);
  const suggestedUsers = (usersResponse?.data.data ?? []).filter(
    (user) => !members.some((member) => member.user?.id === user.id),
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inviteEmail = email.trim();

    if (!inviteEmail || !tripId) {
      return;
    }

    inviteMember({
      tripId,
      body: {
        email: inviteEmail,
        role,
      },
    });
  };

  return (
    <Box className="invite_overlay">
      <Box className="invite_modal">
        <Box className="invite_header">
          <Typography component="h3">Invite to {trip?.title || 'this trip'}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="invite_body">
          <Box className="invite_input_row" component="form" onSubmit={handleSubmit}>
            <label>EMAIL ADDRESS</label>
            <Stack direction="row">
              <Box className="invite_autocomplete">
                <input
                  onBlur={() => window.setTimeout(() => setIsSuggestionsOpen(false), 150)}
                  onChange={(event) => { setEmail(event.target.value); setIsSuggestionsOpen(true); }}
                  onFocus={() => setIsSuggestionsOpen(true)}
                  placeholder="Search name or email..."
                  required
                  type="email"
                  value={email}
                />
                {isSuggestionsOpen && email.trim().length >= 2 && (
                  <Box className="invite_suggestions">
                    {isSearchingUsers && <span className="suggestion_status">Searching users...</span>}
                    {!isSearchingUsers && suggestedUsers.length === 0 && <span className="suggestion_status">No matching users. You can still invite this email.</span>}
                    {suggestedUsers.map((user) => (
                      <button key={user.id} onMouseDown={() => { setEmail(user.email); setIsSuggestionsOpen(false); }} type="button">
                        {user.avatarUrl ? <Box alt={user.name} component="img" src={user.avatarUrl} /> : <span>{getInitials(user.name, user.email)}</span>}
                        <Box><strong>{user.name}</strong><small>{user.email}</small></Box>
                      </button>
                    ))}
                  </Box>
                )}
              </Box>
              <Button disabled={isPending || !email.trim()} type="submit" variant="contained">
                {isPending ? 'Sending...' : 'Send Invite'}
              </Button>
            </Stack>
          </Box>

          <Box className="invite_roles">
            <label>Choose Role</label>
            <Box className="role_grid">
              <label className={`role_card${role === 'collaborator' ? ' active' : ''}`}>
                <input
                  checked={role === 'collaborator'}
                  hidden
                  name="invite-role"
                  onChange={() => setRole('collaborator')}
                  type="radio"
                />
                <span className="role_icon primary">
                  <EditCalendarIcon />
                </span>
                <strong>Collaborator</strong>
                <small>Can edit itinerary, add activities, and invite others.</small>
              </label>
              <label className={`role_card${role === 'viewer' ? ' active' : ''}`}>
                <input
                  checked={role === 'viewer'}
                  hidden
                  name="invite-role"
                  onChange={() => setRole('viewer')}
                  type="radio"
                />
                <span className="role_icon secondary">
                  <VisibilityIcon />
                </span>
                <strong>Viewer</strong>
                <small>Can only view trip details and leave comments.</small>
              </label>
            </Box>
          </Box>

          <Box className="invite_members">
            <Typography>Shared with ({sortedMembers.length})</Typography>
            {sortedMembers.length ? (
              sortedMembers.map((member) => {
                const user = member.user;
                const roleLabel = member.role === 'collaborator' ? 'Collaborator' : 'Viewer';

                return (
                  <Box className="member_item" key={member.id}>
                    <Stack direction="row">
                      {user?.avatarUrl ? (
                        <Box alt={user.name} className="member_avatar" component="img" src={user.avatarUrl} />
                      ) : (
                        <span className="member_initial">{getInitials(user?.name, user?.email)}</span>
                      )}
                      <Box>
                        <strong>{user?.name || user?.email || 'Invited member'}</strong>
                        <small>{user?.email || 'Email unavailable'}</small>
                      </Box>
                    </Stack>
                    <Stack direction="row">
                      <span className={`chip ${member.role}`}>{roleLabel}</span>
                      <IconButton disabled size="small">
                        <PersonRemoveIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                );
              })
            ) : (
              <Box className="member_item empty_member">
                <Typography>No members have joined this trip yet.</Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box className="invite_footer">
          <Button onClick={onClose}>Done</Button>
        </Box>
      </Box>
    </Box>
  );
}
