import { useUsersTravelStats } from "@/api/hooks/users/useUsers.hooks";
import FlightIcon from "@mui/icons-material/Flight";
import MapIcon from "@mui/icons-material/Map";
import PublicIcon from "@mui/icons-material/Public";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SvgIconComponent } from "@mui/icons-material";
import { memo } from "react";

type TravelStat = {
  icon: SvgIconComponent;
  label: string;
  tone: "primary" | "secondary" | "tertiary";
  value: number;
};

const StatItem = memo(function StatItem({ isLoading, stat }: { isLoading: boolean; stat: TravelStat }) {
  const Icon = stat.icon;

  return (
    <Stack className="stat_item" direction="row">
      <Box className={`stat_icon ${stat.tone}`}>
        <Icon />
      </Box>
      <Box>
        <Typography className="stat_label">{stat.label}</Typography>
        <Typography className="stat_value">{isLoading ? <Skeleton width={54} /> : stat.value.toLocaleString()}</Typography>
      </Box>
    </Stack>
  );
});

function ProfileStats() {
  const { data: statsResponse, isLoading } = useUsersTravelStats();
  const travelStats = statsResponse?.data.data;
  const stats: TravelStat[] = [
    { icon: MapIcon, label: "Trips Planned", tone: "primary", value: travelStats?.tripsPlanned ?? 0 },
    { icon: PublicIcon, label: "Destinations Saved", tone: "secondary", value: travelStats?.destinationsSaved ?? 0 },
    { icon: FlightIcon, label: "Upcoming Trips", tone: "tertiary", value: travelStats?.upcomingTrips ?? 0 },
  ];

  return (
    <Box className="stats_card">
      <Typography className="section_title" component="h2">
        My Travel Stats
      </Typography>
      <Stack className="stats_list">
        {stats.map((stat) => (
          <StatItem isLoading={isLoading} key={stat.label} stat={stat} />
        ))}
      </Stack>
    </Box>
  );
}

export default memo(ProfileStats);
