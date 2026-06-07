import { QueryClient } from '@tanstack/react-query';

const IS_PROD = import.meta.env.PROD;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: IS_PROD ? 2 : false,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
});
