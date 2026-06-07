import FlightIcon from "@mui/icons-material/Flight";
import MapIcon from "@mui/icons-material/Map";
import PublicIcon from "@mui/icons-material/Public";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { memo } from "react";

const stats = [
  { icon: MapIcon, label: "Trips Planned", tone: "primary", value: "24" },
  { icon: PublicIcon, label: "Countries Visited", tone: "secondary", value: "12" },
  { icon: FlightIcon, label: "Total Distance", tone: "tertiary", value: "42,850 km" },
] as const;

const StatItem = memo(function StatItem({ stat }: { stat: (typeof stats)[number] }) {
  const Icon = stat.icon;

  return (
    <Stack className="stat_item" direction="row">
      <Box className={`stat_icon ${stat.tone}`}>
        <Icon />
      </Box>
      <Box>
        <Typography className="stat_label">{stat.label}</Typography>
        <Typography className="stat_value">{stat.value}</Typography>
      </Box>
    </Stack>
  );
});

function ProfileStats() {
  return (
    <Box className="stats_card">
      <Typography className="section_title" component="h2">
        My Travel Stats
      </Typography>
      <Stack className="stats_list">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </Stack>
    </Box>
  );
}

export default memo(ProfileStats);
