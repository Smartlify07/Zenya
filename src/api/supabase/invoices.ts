import { supabase } from '@/lib/supabase';

export const fetchInvoices = async () => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('createdat', { ascending: false });

  return { data, error };
};
