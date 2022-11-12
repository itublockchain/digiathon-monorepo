import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

const SUCCESS_CODES = [200, 201, 204];

export const useRequest = (
  cb: (...params: any) => any,
  {
    onSuccess,
    onFail,
    onStart,
  }: {
    onSuccess?: (res: any, ...args: any) => void;
    onFail?: (res: any | AxiosError, ...args: any) => void;
    onStart?: (...args: any) => void;
  } = {},
) => {
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const exec = async (...args: any) => {
    try {
      onStart?.(...args);
      setLoading(true);
      if (!cb) {
        setLoading(false);
        return;
      }
      const res: any = await cb(...args);
      if (SUCCESS_CODES.includes(res.status)) {
        onSuccess?.(res as AxiosResponse, ...args);
      } else {
        onFail?.(res as AxiosResponse, ...args);
      }
      setLoading(false);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
      onFail?.(err as AxiosError, ...args);
      setLoading(false);
      setIsFailed(true);
    }
  };

  return { loading, exec, isFailed };
};
