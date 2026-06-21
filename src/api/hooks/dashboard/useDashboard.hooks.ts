'use client';

import { dashboardOverviewFn } from '@/api/functions/dashboard';
import { listOfQueryKeys } from '@/lib/functions/listOfQueryKeys';
import type { DashboardPeriod } from '@/typescript/interface/api';
import { useQuery } from '@tanstack/react-query';

export const useDashboardOverview = (period: DashboardPeriod) => useQuery({
  queryKey: [listOfQueryKeys.dashboard.overview, period],
  queryFn: () => dashboardOverviewFn(period),
});
