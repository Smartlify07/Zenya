import { supabase } from './supabase';
import { getSession } from './auth.actions';

type API_METHODS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type APILayer<T> = {
  method: API_METHODS;
  table: string;
  column: '*' | keyof T;
  data?: T;
  checkEquality?: boolean;
  equalColumn?: keyof T;
  equalData?: T[keyof T];
};

export const apiLayer = async <T>(
  method: APILayer<T>['method'],
  table: APILayer<T>['table'],
  column: APILayer<T>['column'],
  data?: APILayer<T>['data'],
  checkEquality?: APILayer<T>['checkEquality'],
  equalColumn?: APILayer<T>['equalColumn'],
  equalData?: APILayer<T>['equalData']
) => {
  const methods: API_METHODS[] = ['PATCH', 'POST', 'GET', 'DELETE', 'PUT'];
  let response: any;
  const userSession = await getSession();
  if (!methods.includes(method)) {
    throw new Error('Method not allowed');
  }
  if (!userSession.data.session) {
    throw new Error('Session expired, redirecting...');
  }

  switch (method) {
    case 'GET':
      if (!checkEquality) {
        response = await supabase.from(table).select(column as string);
        return {
          data: response.data,
          error: response.error,
          status: response.status,
        };
      } else {
        response = await supabase
          .from(table)
          .select(column as string)
          .eq(equalColumn! as string, equalData);
        return {
          data: response.data,
          error: response.error,
          status: response.status,
        };
      }

    case 'POST':
      response = await supabase.from(table).insert(data);
      return {
        data: response.data,
        error: response.error,
        status: response.status,
      };

    case 'DELETE':
      response = await supabase
        .from(table)
        .delete()
        .eq(column as string, equalData);
      return {
        data: response.data,
        error: response.error,
        status: response.status,
      };

    default:
      return {
        data: null,
        error: new Error('Method not specified'),
        status: null,
      };
  }
};

export const fetchData = async <T>(
  table: APILayer<T>['table'],
  column: APILayer<T>['column'],
  checkEquality?: APILayer<T>['checkEquality'],
  equalColumn?: APILayer<T>['equalColumn'],
  equalData?: APILayer<T>['equalData']
) => {
  return await apiLayer<T>(
    'GET',
    table,
    column,
    undefined,
    checkEquality,
    equalColumn,
    equalData
  );
};
