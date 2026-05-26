import AppSidebar from '@/components/layout/AppSidebar';
import { tripItineraryAssets } from '@/json/assets';
import { NotificationsPageWrapper } from '@/styles/notifications/notifications.styles';
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { SvgIconComponent } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type NotificationItem = {
  actions?: boolean;
  avatar?: string;
  highlight: string;
  icon?: SvgIconComponent;
  isUnread?: boolean;
  message: string;
  name: string;
  time: string;
  trip: string;
  type: 'avatar' | 'icon';
};

type NotificationSection = {
  items: NotificationItem[];
  label: string;
};

const notificationSections: NotificationSection[] = [
  {
    label: 'Today',
    items: [
      {
        avatar: tripItineraryAssets.members[0],
        highlight: '',
        isUnread: true,
        message: 'added 3 new activities to the itinerary.',
        name: 'Priya Sharma',
        time: '2h ago',
        trip: 'Summer in Kyoto',
        type: 'avatar',
      },
      {
        highlight: '',
        icon: ReceiptLongIcon,
        message: 'New flight expense added by Marcus.',
        name: 'Budget Update:',
        time: '5h ago',
        trip: 'Europe Road Trip',
        type: 'icon',
      },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      {
        avatar: tripItineraryAssets.members[1],
        highlight: '',
        message: 'shared a new photo album.',
        name: 'Marcus Chen',
        time: 'Yesterday',
        trip: 'Iceland Expedition',
        type: 'avatar',
      },
      {
        actions: true,
        highlight: 'Baja Surf Camp',
        icon: GroupAddIcon,
        message: "You've been invited to join",
        name: 'New Invite:',
        time: 'Yesterday',
        trip: '',
        type: 'icon',
      },
    ],
  },
];

export default function NotificationsPage() {
  return (
    <NotificationsPageWrapper>
      <AppSidebar active="notifications" showNewTrip />

      <Box className="notifications_main" component="main">
        <Box className="notifications_topbar" component="header">
          <Box>
            <Typography className="page_title" component="h1">
              Notifications
            </Typography>
            <Typography className="page_subtitle">Track trip invites, itinerary updates, and budget changes.</Typography>
          </Box>

          <Box className="search_wrap">
            <SearchIcon className="search_icon" />
            <TextField className="search_input" hiddenLabel placeholder="Search notifications..." size="small" fullWidth />
          </Box>
        </Box>

        <Box className="notifications_content">
          <Box className="panel">
            <Box className="panel_header">
              <Box>
                <Typography className="panel_title" component="h2">
                  Inbox
                </Typography>
                <Typography className="page_subtitle">2 unread updates need your attention.</Typography>
              </Box>
              <Button className="mark_btn">Mark all read</Button>
            </Box>

            <Box className="notification_sections">
              {notificationSections.map((section) => (
                <Box component="section" key={section.label}>
                  <Typography className="section_label">{section.label}</Typography>
                  <Box className="notification_list">
                    {section.items.map((item) => {
                      const Icon = item.type === 'icon' ? item.icon : null;

                      return (
                        <Box
                          className={`notification_card${item.isUnread ? ' unread' : ''}`}
                          key={`${item.name}-${item.time}`}
                        >
                          {item.type === 'avatar' ? (
                            <Box className="avatar" component="img" src={item.avatar} alt={item.name} />
                          ) : (
                            <Box className={`icon_avatar${item.actions ? '' : ' tertiary'}`}>{Icon && <Icon />}</Box>
                          )}

                          <Box>
                            <Typography className="notification_text">
                              <strong>{item.name}</strong> {item.message}{' '}
                              {item.highlight && <span className="notification_highlight">{item.highlight}</span>}
                            </Typography>
                            <Box className="notification_meta">
                              {item.trip && <span className={`trip_chip${item.isUnread ? '' : ' neutral'}`}>{item.trip}</span>}
                              <span className="notification_time">{item.time}</span>
                            </Box>
                            {item.actions && (
                              <Box className="invite_actions">
                                <Button size="small" variant="contained">
                                  Accept
                                </Button>
                                <Button size="small" variant="outlined">
                                  Decline
                                </Button>
                              </Box>
                            )}
                          </Box>

                          {item.isUnread && <span className="unread_dot" />}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="summary_stack">
            <Box className="summary_card">
              <Typography className="summary_title" component="h2">
                Activity Summary
              </Typography>
              <Box className="metric_grid">
                <Box className="metric_tile">
                  <span className="metric_value">2</span>
                  <span className="metric_label">Unread</span>
                </Box>
                <Box className="metric_tile">
                  <span className="metric_value">4</span>
                  <span className="metric_label">Today</span>
                </Box>
              </Box>
            </Box>

            <Box className="summary_card">
              <Typography className="summary_title" component="h2">
                Filters
              </Typography>
              <Box className="filter_list">
                <span className="filter_item active">
                  <span>All notifications</span>
                  <strong>12</strong>
                </span>
                <span className="filter_item">
                  <span>Invites</span>
                  <strong>3</strong>
                </span>
                <span className="filter_item">
                  <span>Budgets</span>
                  <strong>4</strong>
                </span>
                <span className="filter_item">
                  <span>Itinerary</span>
                  <strong>5</strong>
                </span>
              </Box>
            </Box>

            <Box className="summary_card">
              <Typography className="summary_title" component="h2">
                Quick Actions
              </Typography>
              <Box className="filter_list">
                <Button href="/trips/create" startIcon={<AddIcon />} variant="contained">
                  New Trip
                </Button>
                <Button href="/trips" startIcon={<NotificationsIcon />} variant="outlined">
                  Review trip activity
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </NotificationsPageWrapper>
  );
}
