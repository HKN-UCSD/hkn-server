import { useQuery } from 'react-query';

export interface UseRequestHookParams {
  requestKey: string;
  requestFunc: (...args: any[]) => any;
  requestParams: any[];
}

export function useRequest({ requestKey, requestFunc, requestParams }: UseRequestHookParams) {
  return useQuery(requestKey, async () => {
    try {
      const data = await requestFunc(...requestParams);
      return data;
    } catch (error) {
      throw error;
    }
  });
}