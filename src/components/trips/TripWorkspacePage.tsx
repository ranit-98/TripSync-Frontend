'use client';

import AppSidebar from '@/components/layout/AppSidebar';
import { tripItineraryAssets } from '@/json/assets';
import { itineraryDays, liveUpdates, tripTabs } from '@/json/tripItinerary';
import { TripItineraryWrapper } from '@/styles/trips/itinerary.styles';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsIcon from '@mui/icons-material/Directions';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExploreIcon from '@mui/icons-material/Explore';
import FilterListIcon from '@mui/icons-material/FilterList';
import FlightIcon from '@mui/icons-material/Flight';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ForumIcon from '@mui/icons-material/Forum';
import HotelIcon from '@mui/icons-material/Hotel';
import ImageIcon from '@mui/icons-material/Image';
import InsightsIcon from '@mui/icons-material/Insights';
import LayersIcon from '@mui/icons-material/Layers';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import MicIcon from '@mui/icons-material/Mic';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import RemoveIcon from '@mui/icons-material/Remove';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RouteIcon from '@mui/icons-material/Route';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useState } from 'react';

const iconMap = {
  calendar_month: CalendarMonthIcon,
  chat: ChatIcon,
  dashboard: DashboardIcon,
  explore: ExploreIcon,
  flight: FlightIcon,
  flight_takeoff: FlightTakeoffIcon,
  folder_open: FolderOpenIcon,
  forum: ForumIcon,
  hotel: HotelIcon,
  map: MapIcon,
  notifications: NotificationsIcon,
  payments: PaymentsIcon,
  restaurant: RestaurantIcon,
  settings: SettingsIcon,
} as const;

type IconName = keyof typeof iconMap;
export type TripWorkspaceTab = (typeof tripTabs)[number]['label'];

const tabHrefMap: Record<TripWorkspaceTab, string> = {
  Chat: '/trips/chat',
  Expenses: '/trips/expenses',
  Files: '/trips/itinerary',
  Itinerary: '/trips/itinerary',
  Map: '/trips/map',
};

const expenseRows = [
  {
    amount: '$245.50',
    category: 'Food & Dining',
    date: 'Oct 12, 2023',
    icon: RestaurantIcon,
    paidBy: tripItineraryAssets.members[0],
    split: [tripItineraryAssets.members[1], tripItineraryAssets.members[2], tripItineraryAssets.profile],
    title: 'Team Dinner - Amalfi',
    tone: 'primary',
  },
  {
    amount: '$1,850.00',
    category: 'Accommodation',
    date: 'Oct 11, 2023',
    icon: HotelIcon,
    paidBy: tripItineraryAssets.profile,
    split: [tripItineraryAssets.members[0], tripItineraryAssets.members[1]],
    title: 'Luxury Resort Stay',
    tone: 'tertiary',
  },
  {
    amount: '$65.00',
    category: 'Transportation',
    date: 'Oct 10, 2023',
    icon: DirectionsCarIcon,
    paidBy: tripItineraryAssets.members[2],
    split: [tripItineraryAssets.members[0], tripItineraryAssets.profile],
    title: 'Airport Transfer',
    tone: 'secondary',
  },
] as const;

const routeStops = [
  { title: 'Shinjuku Gyoen Garden', time: '10:00 AM - 12:30 PM', top: '40%', left: '30%' },
  { title: 'Meiji Jingu Shrine', time: '1:00 PM - 3:00 PM', top: '32%', left: '45%' },
  { title: 'Shibuya Crossing', time: '6:30 PM - 9:00 PM', top: '48%', left: '58%' },
] as const;

const chatMembers = [
  {
    avatar: tripItineraryAssets.members[0],
    name: 'Priya Sharma',
    status: 'Typing...',
    online: true,
    active: true,
  },
  {
    avatar: tripItineraryAssets.members[1],
    name: 'Marcus Chen',
    status: 'Online',
    online: true,
    active: false,
  },
  {
    avatar: tripItineraryAssets.members[2],
    name: 'Alex Rivera',
    status: 'Away - 12m ago',
    online: false,
    active: false,
  },
] as const;

function TripIcon({ name }: { name: IconName }) {
  const Icon = iconMap[name];
  return <Icon />;
}

function InviteModal({ onClose }: { onClose: () => void }) {
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

function TripHero({ onCollapse, onInvite }: { onCollapse: () => void; onInvite: () => void }) {
  return (
    <Box className="hero" component="header">
      <Box alt="Paris Skyline" className="hero_img" component="img" src={tripItineraryAssets.hero} />
      <Box className="hero_overlay" />

      <Box className="hero_topbar">
        <IconButton className="glass_icon_btn" aria-label="Go back">
          <ArrowBackIcon />
        </IconButton>
        <Stack className="hero_actions" direction="row">
          <IconButton className="glass_icon_btn" aria-label="Open notifications">
            <NotificationsIcon />
          </IconButton>
          <IconButton className="glass_icon_btn" aria-label="Share trip">
            <ShareIcon />
          </IconButton>
          <Box alt="Avatar" className="profile_avatar" component="img" src={tripItineraryAssets.profile} />
        </Stack>
      </Box>

      <Box className="hero_content">
        <Stack className="hero_copy">
          <Stack className="hero_meta" direction="row">
            <span className="status_pill">Planning</span>
            <span className="hero_date">Oct 12 - Oct 20, 2024</span>
          </Stack>
          <Typography className="hero_title" component="h1">
            Autumn in Paris & Loire
          </Typography>
          <Stack className="member_actions" direction="row">
            <Stack className="member_stack">
              {tripItineraryAssets.members.map((member) => (
                <Box alt="Trip member" className="member_avatar" component="img" key={member} src={member} />
              ))}
              <span className="member_more">+2</span>
            </Stack>
            <Button className="invite_btn" onClick={onInvite} startIcon={<PersonAddIcon />}>
              Invite
            </Button>
            <IconButton className="glass_icon_btn" aria-label="Trip settings">
              <SettingsIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      <IconButton className="hero_toggle" aria-label="Collapse trip hero" onClick={onCollapse}>
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  );
}

function TripTabBar({ activeTab }: { activeTab: TripWorkspaceTab }) {
  return (
    <Box className="tab_bar">
      <Box className="tab_inner">
        {tripTabs.map((tab) => (
          <Button
            className={`tab_btn${activeTab === tab.label ? ' active' : ''}`}
            component={Link}
            href={tabHrefMap[tab.label]}
            key={tab.label}
          >
            <TripIcon name={tab.icon} />
            {tab.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

function ItineraryTab() {
  return (
    <Box className="content_area">
      <Box className="content_grid">
        <Box className="itinerary_col">
          {itineraryDays.map((day) => (
            <Box className="day_card" key={day.title}>
              <Stack className={`day_header${day.expanded ? ' expanded' : ''}`} direction="row">
                <Stack className="day_title_group" direction="row">
                  <Box className={`date_badge${day.expanded ? ' active' : ''}`}>
                    <span className="date_month">{day.dateMonth}</span>
                    <span className="date_day">{day.dateDay}</span>
                  </Box>
                  <Box>
                    <Typography className="day_title">{day.title}</Typography>
                    <Typography className="day_meta">{day.description}</Typography>
                  </Box>
                </Stack>
                <ExpandMoreIcon />
              </Stack>

              {day.expanded && (
                <Box className="activities">
                  {day.activities.map((activity) => (
                    <Box className={`activity_card ${activity.type}`} key={activity.title}>
                      <DragIndicatorIcon className="drag_icon" />
                      <Box className={`activity_icon ${activity.type}`}>
                        <TripIcon name={activity.icon} />
                      </Box>
                      <Box className="activity_main">
                        <Stack className="activity_top" direction="row">
                          <Typography className="activity_title">{activity.title}</Typography>
                          <span className={`time_badge ${activity.type}`}>{activity.time}</span>
                        </Stack>
                        <Typography className="activity_location">
                          <LocationOnIcon fontSize="inherit" />
                          {activity.location}
                        </Typography>
                      </Box>
                      <Box alt="Assignee" className="assignee_avatar" component="img" src={activity.assignee} />
                    </Box>
                  ))}
                  <Button className="add_activity_btn" startIcon={<AddCircleIcon />}>
                    Add Activity
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Box className="feed_col">
          <Box className="live_card">
            <Stack className="live_header" direction="row">
              <Typography className="live_title">Live Updates</Typography>
              <span className="online_pill">
                <span className="online_dot" />3 online
              </span>
            </Stack>

            <Box className="feed_list">
              {liveUpdates.map((item) => (
                <Box className="feed_item" key={`${item.actor}-${item.time}`}>
                  <Box className="feed_avatar_wrap">
                    {item.avatar ? (
                      <Box alt={item.actor} className="feed_avatar" component="img" src={item.avatar} />
                    ) : (
                      <span className="feed_icon">
                        <ForumIcon fontSize="small" />
                      </span>
                    )}
                  </Box>
                  <Box>
                    <Typography className="feed_text">
                      <span className="feed_actor">{item.actor}</span> {item.message}{' '}
                      <span className="feed_highlight">{item.highlight}</span>
                    </Typography>
                    {item.note && <Typography className="feed_note">{item.note}</Typography>}
                    <Typography className="feed_time">{item.time}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button className="view_activity_btn">View all activity</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function ExpensesTab() {
  const [showBudget, setShowBudget] = useState(true);

  return (
    <Box className="tab_page padded_page">
      {showBudget ? (
        <Box className="budget_banner" component="section">
          <IconButton
            className="banner_toggle"
            aria-label="Collapse budget summary"
            onClick={() => setShowBudget(false)}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
          <Stack className="budget_content" direction="row">
            <Box>
              <Typography className="eyebrow">Total Trip Budget</Typography>
              <Stack className="budget_amount" direction="row">
                <Typography component="h2">$4,500.00</Typography>
                <span>/ $6,000.00 planned</span>
              </Stack>
            </Box>
            <Box className="budget_progress">
              <Stack direction="row">
                <span>Budget Utilization</span>
                <strong>75%</strong>
              </Stack>
              <Box className="progress_track">
                <span style={{ width: '75%' }} />
              </Box>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Button
          className="budget_restore"
          onClick={() => setShowBudget(true)}
          startIcon={<KeyboardArrowDownIcon />}
        >
          Show Budget Banner
        </Button>
      )}

      <Box className="expense_grid">
        <Box className="expense_list">
          <Stack className="section_row" direction="row">
            <Typography className="section_heading" component="h2">
              Recent Expenses
            </Typography>
            <Button className="plain_action" endIcon={<FilterListIcon />}>
              Filter
            </Button>
          </Stack>

          <Box className="expense_table">
            <Box className="expense_row expense_head">
              <span>Description</span>
              <span>Amount</span>
              <span>Paid By</span>
              <span>Date</span>
              <span>Split</span>
            </Box>
            {expenseRows.map((expense) => {
              const Icon = expense.icon;

              return (
                <Box className="expense_row" key={expense.title}>
                  <Stack className="expense_desc" direction="row">
                    <Box className={`expense_icon ${expense.tone}`}>
                      <Icon />
                    </Box>
                    <Box>
                      <strong>{expense.title}</strong>
                      <span>{expense.category}</span>
                    </Box>
                  </Stack>
                  <strong>{expense.amount}</strong>
                  <Box alt="" className="paid_avatar" component="img" src={expense.paidBy} />
                  <span className="muted_text">{expense.date}</span>
                  <Stack className="mini_stack" direction="row">
                    {expense.split.map((avatar) => (
                      <Box alt="" className="mini_avatar" component="img" key={avatar} src={avatar} />
                    ))}
                    {expense.title === 'Team Dinner - Amalfi' && <span className="mini_more">+2</span>}
                  </Stack>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box className="settlement_summary">
          <Typography className="section_heading" component="h2">
            Settlement Summary
          </Typography>
          <Box className="summary_panel">
            <Box className="balance_item positive">
              <Box alt="" className="person_avatar" component="img" src={tripItineraryAssets.members[0]} />
              <Box className="balance_copy">
                <strong>Alex owes you</strong>
                <span>for Team Dinner</span>
              </Box>
              <Box className="balance_amount">
                <strong>$82.00</strong>
                <span>Pending</span>
              </Box>
            </Box>
            <Box className="balance_item warning">
              <Box alt="" className="person_avatar" component="img" src={tripItineraryAssets.members[1]} />
              <Box className="balance_copy">
                <strong>You owe Sarah</strong>
                <span>for Car Rental</span>
              </Box>
              <Box className="balance_amount warning">
                <strong>$32.50</strong>
                <span>Due soon</span>
              </Box>
            </Box>
            <Box className="net_balance">
              <span>Net Balance</span>
              <strong>+$49.50</strong>
            </Box>
            <Button className="primary_wide" startIcon={<CheckCircleIcon />}>
              Mark Settled
            </Button>
            <Button className="outline_wide">Send Reminders</Button>
          </Box>
          <Box className="insight_card">
            <span>
              <InsightsIcon />
            </span>
            <Box>
              <strong>Spending Insight</strong>
              <p>Food & Dining is 15% higher than your last trip.</p>
            </Box>
          </Box>
        </Box>
      </Box>
      <IconButton className="round_fab" aria-label="Add expense">
        <AddIcon />
      </IconButton>
    </Box>
  );
}

function MapTab() {
  const [showRoutePanel, setShowRoutePanel] = useState(true);

  return (
    <Box className="map_canvas">
      <Box
        alt="Aerial view of Tokyo"
        className="map_image"
        component="img"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3qRf5Ri6zVRJPyPVQm5A-Sfvj11CNaTuOoZfbVnciwvfSL6qwZGbjQGjEbLMFFuHyeMGTQnapxyvQh7-qkRqTSiDLgp1l9sPkng08Zqg5oOzch2OlFfRYVmhOpTS2WiqYNk7fAQAty62IuCV4pfZfh4itLw054GhQZOSdqzQOhozE_rW9XpXurXsxBIPAvr5NNNZWr3nDSX7aSZvvjgkYu2APrZMZ4JefNESnbTAebpUkQBRggb9UbkkwJJaohFh4-FAEo9vHcQo"
      />
      <svg className="route_svg" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        <path d="M 300,400 L 450,320 L 580,480 L 720,410 L 650,600" />
      </svg>

      {routeStops.map((stop, index) => (
        <Box className="map_marker" key={stop.title} style={{ top: stop.top, left: stop.left }}>
          <span>{index + 1}</span>
          <Box className="marker_popover">
            <strong>{stop.title}</strong>
            <small>{stop.time}</small>
          </Box>
        </Box>
      ))}

      {showRoutePanel ? (
        <Box className="route_panel">
          <IconButton
            className="route_toggle"
            aria-label="Collapse route panel"
            onClick={() => setShowRoutePanel(false)}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
          <Box className="route_header">
            <Typography component="h2">Route Plan</Typography>
            <Typography>Wednesday, March 12</Typography>
            <span>
              <RouteIcon />3 Stops - 12.4 km
            </span>
          </Box>
          <Box className="route_list">
            {routeStops.map((stop, index) => (
              <Box className="route_stop" key={stop.title}>
                <Box className="stop_rail">
                  <span>{index + 1}</span>
                  {index < routeStops.length - 1 && <i />}
                </Box>
                <Box>
                  <strong>{stop.title}</strong>
                  <small>
                    <ScheduleIcon />
                    {stop.time}
                  </small>
                </Box>
              </Box>
            ))}
            <Button className="add_location_btn" startIcon={<AddLocationAltIcon />}>
              Add location
            </Button>
          </Box>
          <Button className="optimize_btn" startIcon={<DirectionsIcon />}>
            Optimize Route
          </Button>
        </Box>
      ) : (
        <Button
          className="route_restore"
          onClick={() => setShowRoutePanel(true)}
          startIcon={<KeyboardArrowDownIcon />}
        >
          Show Route Plan
        </Button>
      )}

      <Box className="weather_badge">
        <WbSunnyIcon />
        <strong>18°C</strong>
        <span>Clear Sky - Tokyo</span>
      </Box>

      <Box className="map_controls">
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <RemoveIcon />
        </IconButton>
        <IconButton>
          <MyLocationIcon />
        </IconButton>
        <IconButton>
          <LayersIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

function ChatTab() {
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

function PlaceholderTab({ label }: { label: string }) {
  return (
    <Box className="tab_page padded_page">
      <Box className="placeholder_panel">
        <Typography component="h2">{label}</Typography>
        <Typography>This tab is ready for the next TripSync module.</Typography>
      </Box>
    </Box>
  );
}

function ActiveTab({ activeTab }: { activeTab: TripWorkspaceTab }) {
  if (activeTab === 'Itinerary') return <ItineraryTab />;
  if (activeTab === 'Expenses') return <ExpensesTab />;
  if (activeTab === 'Map') return <MapTab />;
  if (activeTab === 'Chat') return <ChatTab />;
  return <PlaceholderTab label={activeTab} />;
}

export default function TripWorkspacePage({ activeTab }: { activeTab: TripWorkspaceTab }) {
  const [showHero, setShowHero] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <TripItineraryWrapper>
      <AppSidebar active="trips" showNewTrip />

      <Box className="trip_main" component="main">
        {showHero ? (
          <TripHero onCollapse={() => setShowHero(false)} onInvite={() => setShowInviteModal(true)} />
        ) : (
          <Button
            className="hero_restore"
            startIcon={<KeyboardArrowDownIcon />}
            onClick={() => setShowHero(true)}
          >
            Show Trip Banner
          </Button>
        )}
        <TripTabBar activeTab={activeTab} />
        <ActiveTab activeTab={activeTab} />
      </Box>

      {activeTab === 'Itinerary' && (
        <Button className="mobile_fab" variant="contained" aria-label="Add activity">
          <AddIcon />
        </Button>
      )}

      {showInviteModal && <InviteModal onClose={() => setShowInviteModal(false)} />}
    </TripItineraryWrapper>
  );
}
