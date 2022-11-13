import { useAddress } from '@ethylene/hooks';
import { useRequest } from '@ethylene/hooks/useApiRequest';
import { useEffect, useState } from 'react';
import { useAxios } from 'utils/requestService';
import { SignRequest } from 'types/app';
import { Button, Spinner } from 'ui';
import { useNotify } from 'hooks/useNotify';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { PATHS } from 'const/paths';

export const Approvals = ({}: {}) => {
  const [approvals, setApprovals] = useState<SignRequest[]>([]);
  const address = useAddress();
  const { apiGetSignApprovals } = useAxios();

  const getSignApprovalsReq = useRequest(
    (address: string) => apiGetSignApprovals({ sender: address }),
    {
      onSuccess: (res: AxiosResponse<SignRequest[]>) => {
        setApprovals(res.data);
      },
    },
  );

  useEffect(() => {
    if (address == null) {
      return;
    }
    getSignApprovalsReq.exec(address);
  }, [address]);

  return (
    <div className="flex flex-col">
      {getSignApprovalsReq.loading && (
        <div
          style={{ minHeight: '60vh' }}
          className="w-full h-full flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
      {approvals.length === 0 && !getSignApprovalsReq.loading ? (
        <div className="mt-2 flex justify-center" style={{ marginTop: '2rem' }}>
          <span>Imza isteğiniz bulunmamaktadır</span>
        </div>
      ) : (
        <div className="pt-4">
          {approvals.map((item, key) => (
            <div
              className="flex justify-between items-center w-full rounded-md bg-neutral-100 mb-4 p-4"
              key={key}
            >
              <div className="w-full flex flex-col">
                <span className="text-lg font-medium">{item.title}</span>
                <span className="text-sm">
                  {new Date(item.created * 1000).toTimeString()}
                </span>
              </div>
              <Link href={`${PATHS.approve}/${item._id}`}>
                <div className="ml-auto">
                  <Button color="primary">Görüntüle</Button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
