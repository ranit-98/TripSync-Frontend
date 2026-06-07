'use client';

import { useTripsList } from '@/api/hooks/trips/useTrips.hooks';
import AppSidebar from '@/components/layout/AppSidebar';
import { dashboardAssets } from '@/json/assets';
import { TripListPageWrapper } from '@/styles/trips/tripList.styles';
import type { ITrip } from '@/typescript/interface/api';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentsIcon from '@mui/icons-material/Payments';
import SearchIcon from '@mui/icons-material/Search';
import StyleIcon from '@mui/icons-material/Style';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const formatTripDateRange = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) {
    return 'Dates not set';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 'Dates not set';
  }

  const formatter = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
};

const getTripStatus = (trip: ITrip) => {
  const now = Date.now();
  const start = new Date(trip.startDate).getTime();
  const end = new Date(trip.endDate).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return { label: 'Planned', tone: 'neutral' };
  }

  if (now < start) {
    return { label: 'Upcoming', tone: 'secondary' };
  }

  if (now <= end) {
    return { label: 'Active', tone: 'primary' };
  }

  return { label: 'Completed', tone: 'neutral' };
};

export default function TripListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: tripsResponse, isLoading } = useTripsList();
  const trips = useMemo(() => tripsResponse?.data.data ?? [], [tripsResponse?.data.data]);
  const filteredTrips = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return trips;
    }

    return trips.filter((trip) => {
      return `${trip.title} ${trip.destination}`.toLowerCase().includes(normalizedSearch);
    });
  }, [searchTerm, trips]);
  const featuredTrip = filteredTrips[0];

  return (
    <TripListPageWrapper>
      <AppSidebar active="trips" showNewTrip />

      <Box className="trips_main" component="main">
        <Box className="trips_topbar" component="header">
          <Box>
            <Typography className="page_title" component="h1">
              My Trips
            </Typography>
            <Typography className="page_subtitle">Choose a trip to open its itinerary, map, chat, and expenses.</Typography>
          </Box>

          <Box className="search_wrap">
            <SearchIcon className="search_icon" />
            <TextField
              className="search_input"
              fullWidth
              hiddenLabel
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search trips..."
              size="small"
              value={searchTerm}
            />
          </Box>
        </Box>

        <Box className="trips_content">
          {featuredTrip && (
            <Box className="hero_panel" component="section">
              <Box component="img" src={featuredTrip.coverUrl || dashboardAssets.paris} alt={featuredTrip.title} />
              <Box className="hero_overlay" />
              <Box className="hero_content">
                <span className="hero_tag">Continue planning</span>
                <Typography className="hero_title" component="h2">
                  {featuredTrip.title}
                </Typography>
                <Typography className="hero_meta">{featuredTrip.destination}</Typography>
                <Box className="hero_actions">
                  <Button
                    className="primary_btn"
                    component={Link}
                    endIcon={<ArrowForwardIcon />}
                    href={`/trips/${featuredTrip.id}/itinerary`}
                  >
                    Open trip
                  </Button>
                  <Button className="ghost_btn" component={Link} href="/trips/create" startIcon={<AddIcon />} variant="outlined">
                    New trip
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          <Box className="section_row">
            <Typography className="section_title" component="h2">
              All trips
            </Typography>
            <Button component={Link} href="/trips/create" startIcon={<AddIcon />} variant="contained">
              New Trip
            </Button>
          </Box>

          {isLoading ? (
            <Box className="empty_state">
              <Typography className="empty_title">Loading trips...</Typography>
            </Box>
          ) : filteredTrips.length ? (
            <Box className="trip_grid">
              {filteredTrips.map((trip) => {
                const status = getTripStatus(trip);

                return (
                  <Box className="trip_card" component={Link} href={`/trips/${trip.id}/itinerary`} key={trip.id}>
                    <Box className="trip_media">
                      <Box component="img" src={trip.coverUrl || dashboardAssets.bali} alt={trip.title} />
                      <span className={`trip_status ${status.tone}`}>{status.label}</span>
                    </Box>
                    <Box className="trip_body">
                      <Typography className="trip_title" component="h3">
                        {trip.title}
                      </Typography>
                      <Typography className="trip_date">{trip.destination}</Typography>
                      <Typography className="trip_meta">
                        <CalendarMonthIcon fontSize="small" />
                        {formatTripDateRange(trip.startDate, trip.endDate)}
                      </Typography>
                      <Typography className="trip_meta">
                        <PaymentsIcon fontSize="small" />
                        {trip.budget ? `${trip.currency || 'USD'} ${trip.budget.toLocaleString()}` : 'Budget not set'}
                      </Typography>
                      <Typography className="trip_meta">
                        <StyleIcon fontSize="small" />
                        {trip.styles?.length ? trip.styles.join(', ') : 'No styles added'}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box className="empty_state">
              <Typography className="empty_title">No trips found</Typography>
              <Typography className="empty_copy">
                {searchTerm ? 'Try another search term.' : 'Create a trip to see it here.'}
              </Typography>
              {!searchTerm && (
                <Button component={Link} href="/trips/create" startIcon={<AddIcon />} variant="contained">
                  New Trip
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </TripListPageWrapper>
  );
}
