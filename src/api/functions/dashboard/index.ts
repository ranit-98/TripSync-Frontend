import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import type { ApiMutationResponse, DashboardPeriod, IDashboardOverview } from '@/typescript/interface/api';

export const dashboardOverviewFn = (period: DashboardPeriod): ApiMutationResponse<IDashboardOverview> =>
  axiosInstance.get(endpoints.dashboard.overview('v1', period));
