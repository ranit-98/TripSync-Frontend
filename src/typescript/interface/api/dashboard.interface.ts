import type { ITrip } from './trips.interface';

export type DashboardPeriod = 'month' | 'quarter' | 'half-year' | 'year';

export interface IDashboardOverview {
  period: DashboardPeriod;
  stats: { activeTrips: number; upcomingTrips: number; unreadUpdates: number; pendingInvites: number; totalSpent: number };
  trends: Array<{ label: string; trips: number; expenses: number }>;
  expenseCategories: Array<{ name: string; value: number }>;
  nextTrip: ITrip | null;
  recentTrips: ITrip[];
}
