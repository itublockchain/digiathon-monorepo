import { useRouter } from 'next/router';

export const useQueryParams = <T>() => {
  const { query } = useRouter();

  return query as T;
};
