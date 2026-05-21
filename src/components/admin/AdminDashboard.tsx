import AppSidebar from '@/components/layout/AppSidebar';
import { dashboardAssets } from '@/json/assets';
import { AdminDashboardWrapper } from '@/styles/admin/adminDashboard.styles';
import AddIcon from '@mui/icons-material/Add';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonIcon from '@mui/icons-material/Person';
import ReportIcon from '@mui/icons-material/Report';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const kpis = [
  { icon: GroupIcon, label: 'Total Users', tone: 'primary', trend: '+12.5%', value: '24,512' },
  { icon: ExploreIcon, label: 'Active Trips', tone: 'tertiary', trend: '+4.2%', value: '3,892' },
  { icon: PaymentsIcon, label: 'Revenue', tone: 'secondary', trend: '+18.3%', value: '$128,430' },
  { icon: PersonAddAltIcon, label: 'New Signups', tone: 'neutral', trend: '+2.1%', value: '1,120' },
] as const;

const users = [
  {
    active: true,
    avatar: dashboardAssets.avatars[0],
    email: 'julian.v@tripsync.io',
    name: 'Julian Vance',
    role: 'Admin',
    roleTone: 'admin',
  },
  {
    active: true,
    avatar: dashboardAssets.avatars[1],
    email: 'sarah.c@domain.com',
    name: 'Sarah Connor',
    role: 'Owner',
    roleTone: 'owner',
  },
  {
    active: false,
    avatar: dashboardAssets.avatars[2],
    email: 'm.reed@agency.net',
    name: 'Mark Reed',
    role: 'Member',
    roleTone: 'member',
  },
  {
    active: true,
    avatar: dashboardAssets.userAvatar,
    email: 'elena.r@tripsync.io',
    name: 'Elena Rodriguez',
    role: 'Contributor',
    roleTone: 'contributor',
  },
] as const;

const monthlyTrips = [
  { active: false, label: 'Jan', value: 52 },
  { active: false, label: 'Feb', value: 62 },
  { active: false, label: 'Mar', value: 58 },
  { active: true, label: 'Apr', value: 96 },
  { active: false, label: 'May', value: 72 },
  { active: false, label: 'Jun', value: 80 },
] as const;

const activities = [
  {
    icon: AddIcon,
    text: (
      <>
        <strong>Julian Vance</strong> created a new trip: <em>Tokyo Neon Dreams</em>
      </>
    ),
    time: '2 minutes ago',
    tone: 'primary',
  },
  {
    icon: PersonIcon,
    text: (
      <>
        <strong>Sarah Connor</strong> updated her profile information.
      </>
    ),
    time: '15 minutes ago',
    tone: 'tertiary',
  },
  {
    icon: PaymentsIcon,
    text: (
      <>
        New premium subscription from <strong>Mark Reed</strong>.
      </>
    ),
    time: '1 hour ago',
    tone: 'secondary',
  },
  {
    icon: GroupAddIcon,
    text: (
      <>
        <strong>3 new users</strong> joined the platform from invitation links.
      </>
    ),
    time: '3 hours ago',
    tone: 'primary',
  },
  {
    icon: ReportIcon,
    text: <>System Alert: Database backup completed successfully.</>,
    time: '5 hours ago',
    tone: 'error',
  },
] as const;

export default function AdminDashboard() {
  return (
    <AdminDashboardWrapper>
      <AppSidebar active="dashboard" dashboardHref="/admin/dashboard" showNewTrip />

      <Box className="admin_main" component="main">
        <Box className="admin_topbar" component="header">
          <Typography className="admin_title" component="h1">
            Admin Dashboard
          </Typography>

          <Stack className="topbar_actions" direction="row">
            <Box className="search_wrap">
              <SearchIcon className="search_icon" />
              <TextField
                className="search_input"
                hiddenLabel
                placeholder="Search analytics..."
                size="small"
              />
            </Box>
            <IconButton className="notification_btn" aria-label="Open notifications">
              <NotificationsIcon />
              <span className="notification_badge" />
            </IconButton>
            <Box
              alt="Administrator profile"
              className="topbar_avatar"
              component="img"
              src={dashboardAssets.userAvatar}
            />
          </Stack>
        </Box>

        <Box className="admin_content">
          <Box className="stats_grid" component="section">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;

              return (
                <Box className="stat_card" key={kpi.label}>
                  <Stack className="stat_header" direction="row">
                    <Box className={`stat_icon ${kpi.tone}`}>
                      <Icon />
                    </Box>
                    <span className={`trend_pill ${kpi.tone}`}>{kpi.trend}</span>
                  </Stack>
                  <Typography className="metric_label">{kpi.label}</Typography>
                  <Typography className="metric_value">{kpi.value}</Typography>
                </Box>
              );
            })}
          </Box>

          <Box className="admin_grid">
            <Box className="panel user_panel" component="section">
              <Box className="panel_header">
                <Typography className="panel_title" component="h2">
                  User Management
                </Typography>
                <Button className="view_all_btn">View All Users</Button>
              </Box>

              <Box className="users_table" role="table">
                <Box className="table_row table_head" role="row">
                  <span>User</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Status</span>
                  <span>Actions</span>
                </Box>

                {users.map((user) => (
                  <Box className="table_row" role="row" key={user.email}>
                    <Stack className="user_cell" direction="row">
                      <Box alt="" className="table_avatar" component="img" src={user.avatar} />
                      <strong>{user.name}</strong>
                    </Stack>
                    <span className="email_cell">{user.email}</span>
                    <span className={`role_pill ${user.roleTone}`}>{user.role}</span>
                    <span className={`status_toggle${user.active ? ' active' : ''}`}>
                      <span />
                    </span>
                    <Stack className="action_cell" direction="row">
                      <IconButton aria-label={`Edit ${user.name}`}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label={`Delete ${user.name}`}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Box>

            <Stack className="side_panels">
              <Box className="panel chart_panel" component="section">
                <Typography className="panel_title" component="h2">
                  Trips Created / Month
                </Typography>
                <Stack className="bar_chart" direction="row">
                  {monthlyTrips.map((month) => (
                    <Box className="bar_item" key={month.label}>
                      <span
                        className={`bar${month.active ? ' active' : ''}`}
                        style={{ height: `${month.value}%` }}
                      />
                      <span className="bar_label">{month.label}</span>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box className="panel activity_panel" component="section">
                <Typography className="panel_title" component="h2">
                  Recent Activity
                </Typography>
                <Stack className="activity_list">
                  {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                      <Stack className="activity_item" direction="row" key={activity.time}>
                        <Box className={`activity_icon ${activity.tone}`}>
                          <Icon />
                        </Box>
                        <Box>
                          <Typography className="activity_text">{activity.text}</Typography>
                          <Typography className="activity_time">{activity.time}</Typography>
                        </Box>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Box className="status_footer" component="footer">
            <Stack className="status_items" direction="row">
              <span>
                System Status: <strong>Operational</strong>
              </span>
              <span>
                API Latency: <b>24ms</b>
              </span>
            </Stack>
            <span>© 2024 TripSync Admin Portal v2.4.0</span>
          </Box>
        </Box>
      </Box>

      <Box className="mobile_nav" component="nav">
        <Box className="mobile_nav_link active" component="a" href="#">
          <DashboardIcon />
          <span>Dash</span>
        </Box>
        <Box className="mobile_nav_link" component="a" href="#">
          <GroupIcon />
          <span>Users</span>
        </Box>
        <Box className="mobile_nav_link" component="a" href="#">
          <AnalyticsIcon />
          <span>Stats</span>
        </Box>
        <Box className="mobile_nav_link" component="a" href="#">
          <SettingsIcon />
          <span>Settings</span>
        </Box>
      </Box>
    </AdminDashboardWrapper>
  );
}
