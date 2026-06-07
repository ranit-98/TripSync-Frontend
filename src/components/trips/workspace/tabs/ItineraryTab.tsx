'use client';

import { useItinerary } from '@/api/hooks/itinerary/useItinerary.hooks';
import { tripItineraryAssets } from '@/json/assets';
import type { IActivity, IItineraryDay } from '@/typescript/interface/api';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import AddItineraryItemModal, { type AddItineraryMode } from '../AddItineraryItemModal';
import { TripIcon } from '../shared';

const getArrayFromRecord = (value: unknown, key: string) => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const candidate = record[key];

  return Array.isArray(candidate) ? candidate : undefined;
};

const normalizeItineraryDays = (value: unknown): IItineraryDay[] => {
  if (Array.isArray(value)) {
    return value as IItineraryDay[];
  }

  const directDays = getArrayFromRecord(value, 'days');

  if (directDays) {
    return directDays as IItineraryDay[];
  }

  const directItinerary = getArrayFromRecord(value, 'itinerary');

  if (directItinerary) {
    return directItinerary as IItineraryDay[];
  }

  if (value && typeof value === 'object') {
    const itinerary = (value as Record<string, unknown>).itinerary;
    const nestedDays = getArrayFromRecord(itinerary, 'days');

    if (nestedDays) {
      return nestedDays as IItineraryDay[];
    }
  }

  return [];
};

const getDayActivities = (day: IItineraryDay) => {
  return Array.isArray(day.activities) ? day.activities : [];
};

const formatDayParts = (dateValue?: string) => {
  const date = dateValue ? new Date(dateValue) : null;

  if (!date || Number.isNaN(date.getTime())) {
    return { day: '--', month: 'DAY' };
  }

  return {
    day: new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date),
    month: new Intl.DateTimeFormat('en', { month: 'short' }).format(date),
  };
};

const formatActivityTime = (activity: IActivity) => {
  if (!activity.startTime && !activity.endTime) {
    return 'Time TBD';
  }

  if (activity.startTime && activity.endTime) {
    return `${activity.startTime} - ${activity.endTime}`;
  }

  return activity.startTime || activity.endTime || 'Time TBD';
};

const getActivityType = (activity: IActivity) => {
  const text = `${activity.title} ${activity.description ?? ''}`.toLowerCase();

  if (text.includes('flight') || text.includes('airport')) {
    return 'flight';
  }

  if (text.includes('hotel') || text.includes('check-in') || text.includes('stay')) {
    return 'hotel';
  }

  if (text.includes('food') || text.includes('dinner') || text.includes('lunch') || text.includes('restaurant')) {
    return 'food';
  }

  return 'hotel';
};

const getActivityIcon = (activity: IActivity) => {
  const type = getActivityType(activity);

  if (type === 'flight') return 'flight';
  if (type === 'food') return 'restaurant';
  return 'hotel';
};

const getDayDescription = (day: IItineraryDay) => {
  const activityCount = getDayActivities(day).length;

  return `${activityCount} ${activityCount === 1 ? 'activity' : 'activities'}`;
};

export default function ItineraryTab({ tripId }: { tripId: string }) {
  const [addModal, setAddModal] = useState<{ dayId?: string; mode: AddItineraryMode } | null>(null);
  const { data: itineraryResponse, isLoading } = useItinerary(tripId);
  const days = normalizeItineraryDays(itineraryResponse?.data.data);

  return (
    <>
      <Box className="content_area">
      <Box className="content_grid">
        <Box className="itinerary_col">
          {isLoading ? (
            <Box className="empty_panel">
              <Typography className="empty_title">Loading itinerary...</Typography>
            </Box>
          ) : days.length ? (
            <>
              {days.map((day, index) => {
              const dateParts = formatDayParts(day.date);
              const expanded = index === 0;

              return (
                <Box className="day_card" key={day.id}>
                  <Stack className={`day_header${expanded ? ' expanded' : ''}`} direction="row">
                    <Stack className="day_title_group" direction="row">
                      <Box className={`date_badge${expanded ? ' active' : ''}`}>
                        <span className="date_month">{dateParts.month}</span>
                        <span className="date_day">{dateParts.day}</span>
                      </Box>
                      <Box>
                        <Typography className="day_title">{day.title || `Day ${index + 1}`}</Typography>
                        <Typography className="day_meta">{getDayDescription(day)}</Typography>
                      </Box>
                    </Stack>
                    <ExpandMoreIcon />
                  </Stack>

                  {expanded && (
                <Box className="activities">
                  {getDayActivities(day).length ? (
                    getDayActivities(day).map((activity) => {
                      const activityType = getActivityType(activity);

                      return (
                        <Box className={`activity_card ${activityType}`} key={activity.id}>
                          <DragIndicatorIcon className="drag_icon" />
                          <Box className={`activity_icon ${activityType}`}>
                            <TripIcon name={getActivityIcon(activity)} />
                          </Box>
                          <Box className="activity_main">
                            <Stack className="activity_top" direction="row">
                              <Typography className="activity_title">{activity.title}</Typography>
                              <span className={`time_badge ${activityType}`}>{formatActivityTime(activity)}</span>
                            </Stack>
                            <Typography className="activity_location">
                              <LocationOnIcon fontSize="inherit" />
                              {activity.location || activity.description || 'Location not set'}
                            </Typography>
                          </Box>
                          <Box alt="Assignee" className="assignee_avatar" component="img" src={tripItineraryAssets.profile} />
                        </Box>
                      );
                    })
                  ) : (
                    <Box className="empty_inline">No activities for this day yet.</Box>
                  )}
                  <Button
                    className="add_activity_btn"
                    onClick={() => setAddModal({ dayId: day.id, mode: 'activity' })}
                    startIcon={<AddCircleIcon />}
                  >
                    Add Activity
                  </Button>
                </Box>
              )}
                </Box>
              );
              })}
              <Button
                className="add_day_btn"
                onClick={() => setAddModal({ mode: 'day' })}
                startIcon={<AddCircleIcon />}
              >
                Add Day
              </Button>
            </>
          ) : (
            <Box className="empty_panel">
              <Typography className="empty_title">No itinerary days yet</Typography>
              <Typography className="empty_copy">Add days and activities to start planning this trip.</Typography>
              <Button onClick={() => setAddModal({ mode: 'day' })} startIcon={<AddCircleIcon />} variant="contained">
                Add Day
              </Button>
            </Box>
          )}
        </Box>

        <Box className="feed_col">
          <Box className="live_card">
            <Stack className="live_header" direction="row">
              <Typography className="live_title">Live Updates</Typography>
              <span className="online_pill">
                <span className="online_dot" />
                {days.length} {days.length === 1 ? 'day' : 'days'}
              </span>
            </Stack>

            <Box className="feed_list compact">
              {days.slice(0, 4).map((day, index) => (
                <Box className="feed_item" key={day.id}>
                  <Box className="feed_avatar_wrap">
                    <Box alt="" className="feed_avatar" component="img" src={tripItineraryAssets.profile} />
                  </Box>
                  <Box>
                    <Typography className="feed_text">
                      <span className="feed_actor">Day {index + 1}</span>{' '}
                      <span className="feed_highlight">{day.title || formatDayParts(day.date).month}</span>
                    </Typography>
                    <Typography className="feed_time">{getDayDescription(day)}</Typography>
                  </Box>
                </Box>
              ))}
              {!days.length && <Typography className="empty_copy">No activity yet.</Typography>}
            </Box>
            <Button className="view_activity_btn">View all activity</Button>
          </Box>
        </Box>
      </Box>
      </Box>
      {addModal && (
        <AddItineraryItemModal
          dayId={addModal.dayId}
          mode={addModal.mode}
          onClose={() => setAddModal(null)}
          tripId={tripId}
        />
      )}
    </>
  );
}
