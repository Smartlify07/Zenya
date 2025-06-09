import { fetchInvoices } from '@/api/supabase/invoices';
import { useQuery } from '@tanstack/react-query';

export const useInvoices = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const res = await fetchInvoices();
      return res;
    },
  });
};
