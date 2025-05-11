import { supabase } from './supabase';
import { getSession } from './auth.actions';

type API_METHODS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type APILayer<T> = {
  method: API_METHODS;
  table: string;
  column: '*' | keyof T;
  data?: T;
  scopedToUser: boolean;
  filters?: Partial<Record<keyof T, T[keyof T]>>;
};

type APIResponse<T = any> = {
  data: T | null;
  error: Error | null;
  status: string | null;
};

export const apiLayer = async <T>(
  method: APILayer<T>['method'],
  table: APILayer<T>['table'],
  column: APILayer<T>['column'],
  data?: APILayer<T>['data'],
  filters: any = {},
  scopedToUser: APILayer<T>['scopedToUser'] = false
) => {
  const methods: API_METHODS[] = ['PATCH', 'POST', 'GET', 'DELETE', 'PUT'];
  let response: any;
  const userSession = await getSession();
  const user_id = userSession?.data?.session?.user?.id;
  if (!methods.includes(method)) {
    throw new Error('Method not allowed');
  }
  if (!userSession.data.session) {
    throw new Error('Session expired, redirecting...');
  }
  if (scopedToUser && !user_id) {
    return { data: null, error: new Error('Not authenticated'), status: null };
  }
  const handleResponse = (response: APIResponse<T>) => ({
    data: response.data,
    error: response.error,
    status: response.status,
  });

  const appliedFilters = user_id
    ? {
        ...filters,
        user_id,
      }
    : filters;

  switch (method) {
    case 'GET':
      let query = supabase.from(table).select(column as string);
      for (const key in appliedFilters) {
        query = query.eq(key as string, appliedFilters[key]!);
      }

      response = await query;
      return handleResponse(response);

    case 'POST':
      response = await supabase
        .from(table)
        .insert(scopedToUser ? { ...data, user_id: user_id } : data);
      return handleResponse(response);

    case 'DELETE':
      let deleteQuery = supabase.from(table).delete();
      for (const key in appliedFilters) {
        deleteQuery = deleteQuery.eq(key as string, appliedFilters[key]!);
      }
      const response = await deleteQuery;
      return handleResponse(response);
    default:
      return handleResponse({
        data: null,
        error: new Error('Method not specified'),
        status: null,
      });
  }
};

export const fetchData = async <T>(
  table: APILayer<T>['table'],
  scopedToUser: APILayer<T>['scopedToUser'],
  column: APILayer<T>['column'],
  filters: {}
): Promise<APIResponse<T>> => {
  return await apiLayer<T>(
    'GET',
    table,
    scopedToUser,
    column,
    undefined,
    filters
  );
};
