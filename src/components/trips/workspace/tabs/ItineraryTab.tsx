import { itineraryDays, liveUpdates } from '@/json/tripItinerary';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ForumIcon from '@mui/icons-material/Forum';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TripIcon } from '../shared';

export default function ItineraryTab() {
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
