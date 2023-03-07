
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { tesloApi } from '../../global';

import { DashboardSummaryResponse } from '@/features/next-teslo';


const INITIAL_DATA_DASHBOARD_SUMMARY_RESPONSE = {
    numberOfOrders: 0,
    paidOrders: 0,
    numberOfClients: 0,
    numberOfProducts: 0,
    productsWithNoInventory: 0,
    lowInventory: 0,
    notPaidOrders: 0,
} as DashboardSummaryResponse;


export const getDashboard = (): Promise<DashboardSummaryResponse> => {
  return tesloApi.get('/admin/dashboard');
};


type UseDashboardProps = {
  useQueryOptions: UseQueryOptions<DashboardSummaryResponse>
};

type UseDashboardResponse = {
    data: DashboardSummaryResponse | undefined,
    error: unknown,
    isLoading: boolean
}

export const useDashboard = ({ useQueryOptions }: UseDashboardProps): UseDashboardResponse  => {
  const { data, error, isFetching, isFetched } = useQuery<DashboardSummaryResponse>({
    queryKey: ['dashboard'],
    queryFn: () => getDashboard(),
    enabled: true,
    initialData: INITIAL_DATA_DASHBOARD_SUMMARY_RESPONSE,
    ...useQueryOptions
  });

  return {
    data,
    error,
    isLoading: isFetching && !isFetched,
  };
};
