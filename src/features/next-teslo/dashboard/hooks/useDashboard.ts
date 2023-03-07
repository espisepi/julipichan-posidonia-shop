
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { DashboardSummaryResponse } from '@/features/next-teslo';

import { getDashboard } from '@/features/next-teslo';


const INITIAL_DATA_DASHBOARD_SUMMARY_RESPONSE = {
    numberOfOrders: 0,
    paidOrders: 0,
    numberOfClients: 0,
    numberOfProducts: 0,
    productsWithNoInventory: 0,
    lowInventory: 0,
    notPaidOrders: 0,
} as DashboardSummaryResponse;




type UseDashboardProps = {
  useQueryOptions: UseQueryOptions<DashboardSummaryResponse>
};


// DOCUMENTATION useQuery
//https://tanstack.com/query/v4/docs/react/reference/useQuery

export const useDashboard = ({ useQueryOptions }: UseDashboardProps) => {
  const { data, error, isFetching, isFetched, ...params } = useQuery<DashboardSummaryResponse>({
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
    ...params,
  };
};
