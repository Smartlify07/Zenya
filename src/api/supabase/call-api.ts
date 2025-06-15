import { supabase } from '@/lib/supabase';
import type { SupabaseFetchResult } from '@/types';
import type { User } from '@supabase/supabase-js';

export const fetchData = async <T>(options?: {
  table: string;
  filters?: Record<string, string | number>;
  limit?: number;
  offset?: number;
  joins?: string[];
  order?: boolean;
  single?: boolean;
}): Promise<SupabaseFetchResult<T>> => {
  let query = supabase.from(options?.table!).select(
    // Always include the main table; spread any joins you ask for
    ['*', ...(options?.joins ?? []).map((tbl) => `${tbl}(*)`)].join(',')
  );

  // Apply eq‑filters
  if (options?.filters) {
    Object.entries(options.filters).forEach(([col, val]) => {
      query = query.eq(col, val as any);
    });
  }

  // Optional pagination
  if (options?.limit != null) query = query.limit(options.limit);
  if (options?.offset != null)
    query = query.range(options.offset, options.offset + options.limit! - 1);

  const { data, error } = options?.single
    ? await query.order('created_at', { ascending: false }).single()
    : await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks', error);
    return { data: null, error };
  }

  return { data: data as unknown as T | null, error };
};

export const createData = async <T>(
  table: string,
  payload: T,
  user_id: User['id']
) => {
  const { data, error } = await supabase
    .from(table)
    .insert({ ...payload, user_id })
    .select('*');

  if (error) {
    console.error(error);
    throw error;
  }
  return { data, error };
};

export const updateData = async <T>(
  table: string,
  payload: T,
  user_id: User['id'],
  options?: {
    filters: Record<string, string | number>;
  }
) => {
  let query = supabase.from(table).update({ ...payload });

  if (options?.filters) {
    Object.entries(options.filters).forEach(([col, val]) => {
      query = query.eq(col, val as any);
    });
  }

  const { data, error } = await query.eq('user_id', user_id);

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};
