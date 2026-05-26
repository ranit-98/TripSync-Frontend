import AddIcon from '@mui/icons-material/Add';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DirectionsIcon from '@mui/icons-material/Directions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LayersIcon from '@mui/icons-material/Layers';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import RemoveIcon from '@mui/icons-material/Remove';
import RouteIcon from '@mui/icons-material/Route';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { routeStops } from '../shared';

export default function MapTab() {
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
