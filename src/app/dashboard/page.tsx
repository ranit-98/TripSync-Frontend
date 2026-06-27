"use client";

import { useDashboardOverview } from "@/api/hooks/dashboard/useDashboard.hooks";
import AppSidebar from "@/components/layout/AppSidebar";
import AuthTopbar from "@/components/layout/AuthTopbar";
import { DashboardPageWrapper } from "@/styles/dashboard/dashboard.styles";
import type { DashboardPeriod } from "@/typescript/interface/api";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaymentsIcon from "@mui/icons-material/Payments";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const periods: Array<{ label: string; value: DashboardPeriod }> = [
  { label: "Monthly", value: "month" },
  { label: "Quarterly", value: "quarter" },
  { label: "Half-yearly", value: "half-year" },
  { label: "Yearly", value: "year" },
];
const colors = ["#008378", "#f0a100", "#7388db", "#b05e3d", "#4c8fbe"];
const dateLabel = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

export default function DashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriod>("half-year");
  const { data: response, isLoading } = useDashboardOverview(period);
  const overview = response?.data.data;
  const stats = overview?.stats;
  const cards = [
    {
      icon: FlightTakeoffIcon,
      label: "Active trips",
      value: stats?.activeTrips,
      tone: "primary",
    },
    {
      icon: CalendarMonthIcon,
      label: "Upcoming",
      value: stats?.upcomingTrips,
      tone: "secondary",
    },
    {
      icon: PaymentsIcon,
      label: "Period spend",
      value: stats ? `$${stats.totalSpent.toLocaleString()}` : undefined,
      tone: "tertiary",
    },
    {
      icon: NotificationsIcon,
      label: "Unread updates",
      value: stats?.unreadUpdates,
      tone: "primary",
    },
  ];

  return (
    <DashboardPageWrapper>
      <AppSidebar active="dashboard" showNewTrip />
      <Box className="dashboard_main" component="main">
        <AuthTopbar
          actions={
            <ToggleButtonGroup
              className="period_filter"
              exclusive
              onChange={(_, value) => value && setPeriod(value)}
              size="small"
              value={period}
            >
              {periods.map((item) => (
                <ToggleButton key={item.value} value={item.value}>
                  {item.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          }
          subtitle="Your dashboard updates from one live analytics feed."
          title="Dashboard"
        />
        <Box className="dashboard_content">
          <Box className="mobile_page_header">
            <Typography className="page_title" component="h1">
              Dashboard
            </Typography>
            <Typography className="section_copy">
              Your dashboard updates from one live analytics feed.
            </Typography>
          </Box>
          <Box className="analytics_head">
            {/* <Box>
              <Typography className="section_title" component="h2">
                Travel analytics
              </Typography>
              <Typography className="section_copy">
                Your dashboard updates from one live analytics feed.
              </Typography>
            </Box> */}
            <ToggleButtonGroup
              className="period_filter"
              exclusive
              onChange={(_, value) => value && setPeriod(value)}
              size="small"
              value={period}
            >
              {periods.map((item) => (
                <ToggleButton key={item.value} value={item.value}>
                  {item.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Box className="stats_grid analytics_stats">
            {cards.map(({ icon: Icon, label, value, tone }) => (
              <Box className="stat_card" key={label}>
                <Box className={`stat_icon ${tone}`}>
                  <Icon />
                </Box>
                <Box>
                  <Typography className="metric_label">{label}</Typography>
                  <Typography className="metric_value">
                    {isLoading ? <Skeleton width={72} /> : (value ?? 0)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className="dashboard_grid analytics_grid">
            <Box className="insight_card chart_card">
              <Box className="section_header">
                <Box>
                  <Typography className="section_title" component="h2">
                    Trip momentum
                  </Typography>
                  <Typography className="section_copy">
                    New trips over the selected period
                  </Typography>
                </Box>
                <TrendingUpIcon className="trend_icon" />
              </Box>
              <Box className="activity_chart">
                {isLoading ? (
                  <Skeleton animation="wave" height="100%" variant="rounded" />
                ) : (
                  <ResponsiveContainer height="100%" width="100%">
                    <AreaChart data={overview?.trends || []}>
                      <defs>
                        <linearGradient
                          id="tripsFill"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#008378"
                            stopOpacity={0.38}
                          />
                          <stop
                            offset="100%"
                            stopColor="#008378"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        stroke="#dbe5e1"
                        strokeDasharray="3 3"
                        vertical={false}
                      />
                      <XAxis dataKey="label" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Area
                        dataKey="trips"
                        fill="url(#tripsFill)"
                        name="Trips"
                        stroke="#008378"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </Box>
            <Box className="insight_card chart_card">
              <Box className="section_header">
                <Box>
                  <Typography className="section_title" component="h2">
                    Expense trend
                  </Typography>
                  <Typography className="section_copy">
                    Total recorded spending for the selected period
                  </Typography>
                </Box>
                <PaymentsIcon className="trend_icon" />
              </Box>
              <Box className="activity_chart">
                {isLoading ? (
                  <Skeleton animation="wave" height="100%" variant="rounded" />
                ) : (
                  <ResponsiveContainer height="100%" width="100%">
                    <BarChart
                      data={overview?.trends || []}
                      margin={{ left: 10, right: 24, top: 8 }}
                    >
                      <CartesianGrid
                        stroke="#dbe5e1"
                        strokeDasharray="3 3"
                        vertical={false}
                      />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) =>
                          `$${Number(value).toLocaleString()}`
                        }
                      />
                      <Bar
                        dataKey="expenses"
                        fill="#f0a100"
                        maxBarSize={44}
                        name="Spend"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </Box>
          </Box>
          <Box className="dashboard_grid lower_grid">
            <Box className="insight_card next_trip_card">
              <Typography className="metric_label">Next up</Typography>
              {isLoading ? (
                <Skeleton height={110} width="70%" />
              ) : overview?.nextTrip ? (
                <>
                  <Typography className="next_trip_title">
                    {overview.nextTrip.title}
                  </Typography>
                  <Typography className="section_copy">
                    {overview.nextTrip.destination} ·{" "}
                    {dateLabel(overview.nextTrip.startDate)}
                  </Typography>
                  <Button
                    component={Link}
                    endIcon={<ArrowForwardIcon />}
                    href={`/trips/${overview.nextTrip.id}/itinerary`}
                  >
                    Open trip
                  </Button>
                </>
              ) : (
                <Typography className="next_trip_title">
                  No upcoming trips
                </Typography>
              )}
            </Box>
            <Box className="insight_card spend_card">
              <Typography className="section_title" component="h2">
                Spend by category
              </Typography>
              <Typography className="section_copy">
                Where the budget went
              </Typography>
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  className="category_skeleton"
                  variant="circular"
                />
              ) : (
                <>
                  <Box className="category_chart">
                    <ResponsiveContainer height="100%" width="100%">
                      <PieChart>
                        <Pie
                          data={overview?.expenseCategories || []}
                          dataKey="value"
                          innerRadius={48}
                          outerRadius={76}
                          paddingAngle={3}
                        >
                          {(overview?.expenseCategories || []).map(
                            (entry, index) => (
                              <Cell
                                fill={colors[index % colors.length]}
                                key={entry.name}
                              />
                            ),
                          )}
                        </Pie>
                        <Tooltip
                          formatter={(value) =>
                            `$${Number(value).toLocaleString()}`
                          }
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box className="category_legend">
                    {(overview?.expenseCategories || []).map((entry, index) => (
                      <span key={entry.name}>
                        <i
                          style={{
                            backgroundColor: colors[index % colors.length],
                          }}
                        />
                        {entry.name}
                        <strong>${entry.value.toLocaleString()}</strong>
                      </span>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardPageWrapper>
  );
}
