
import { useMutation } from '@tanstack/react-query';


import { IProduct, queryClient } from '@/features/next-teslo';

import { createProduct } from '../api/create-product';


// const INITIAL_DATA_DASHBOARD_SUMMARY_RESPONSE = {
//     numberOfOrders: 0,
//     paidOrders: 0,
//     numberOfClients: 0,
//     numberOfProducts: 0,
//     productsWithNoInventory: 0,
//     lowInventory: 0,
//     notPaidOrders: 0,
// } as DashboardSummaryResponse;




// type UseDashboardProps = {

//   useQueryOptions: UseQueryOptions<DashboardSummaryResponse>
// };


// DOCUMENTATION useQuery
//https://tanstack.com/query/v4/docs/react/reference/useQuery

// export const useCreateProduct = ({ useQueryOptions }: UseDashboardProps) => {
//   const { data, error, isFetching, isFetched, ...params } = useQuery<DashboardSummaryResponse>({
//     queryKey: ['dashboard'],
//     queryFn: () => getDashboard(),
//     enabled: true,
//     initialData: INITIAL_DATA_DASHBOARD_SUMMARY_RESPONSE,
//     ...useQueryOptions
//   });

//   return {
//     data,
//     error,
//     isLoading: isFetching && !isFetched,
//     ...params,
//   };
// };

type UseCreateProductOptions = {
  onSuccess?: (product: IProduct) => void;
};

export const useCreateProduct = ({
  onSuccess,
}: UseCreateProductOptions = {}) => {

  const { mutate: submit, isLoading, ...params } = useMutation({
    mutationFn: createProduct,
    onSuccess: (product) => {
      queryClient.invalidateQueries(['products']);
      onSuccess?.(product);
    },
  });

  return { submit, isLoading, ...params };
};



// Implementacion segun el libro "React Application Architecture for Production"

// ============ COMPONENT =========================

//  const onSuccess = () => {
//     router.push(`/dashboard/jobs`);
//   };

//const createJob = useCreateJob({ onSuccess });

// createJob.submit({ data });
// createJob.isLoading

// ============ HOOK =========================

// type UseCreateJobOptions = {
//   onSuccess?: (job: Job) => void;
// };

// export const useCreateJob = ({
//   onSuccess,
// }: UseCreateJobOptions = {}) => {
//   const { mutate: submit, isLoading } = useMutation({
//     mutationFn: createJob,
//     onSuccess: (job) => {
//       queryClient.invalidateQueries(['jobs']);
//       onSuccess?.(job);
//     },
//   });

//   return { submit, isLoading };
// };

// ============ API =========================

// type CreateJobOptions = {
//   data: CreateJobData;
// };

// export const createJob = ({
//   data,
// }: CreateJobOptions): Promise<Job> => {
//   return apiClient.post(`/jobs`, data);
// };

// type UseCreateJobOptions = {
//   onSuccess?: (job: Job) => void;
// };


