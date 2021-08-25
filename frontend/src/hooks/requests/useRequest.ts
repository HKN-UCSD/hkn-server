import { useQuery, UseQueryResult } from 'react-query';

export interface UseRequestHookParams {
  requestKey: string;
  requestFunc: (...args: any[]) => any;
  requestParams: any[];
}

export function useRequest<DataType, ErrorType>(
  params: UseRequestHookParams
): UseQueryResult<DataType, ErrorType> {
  const { requestKey, requestFunc, requestParams } = params;
  return useQuery<DataType, ErrorType>(requestKey, async () => {
    const data = await requestFunc(...requestParams);
    return data;
  });
}
