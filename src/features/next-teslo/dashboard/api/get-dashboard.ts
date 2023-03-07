
import { tesloApi } from '../../global';

import { DashboardSummaryResponse } from '@/features/next-teslo';



export const getDashboard = (): Promise<DashboardSummaryResponse> => {
  return tesloApi.get('/admin/dashboard');
};

