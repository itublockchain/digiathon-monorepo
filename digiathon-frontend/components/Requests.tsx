import { useAddress } from '@ethylene/hooks';
import { useRequest } from '@ethylene/hooks/useApiRequest';
import { ModalController } from '@ethylene/ui-hooks/useModal';
import { useEffect, useState } from 'react';
import { useAxios } from 'utils/requestService';
import { SignRequest } from 'types/app';
import { Button, Input, Modal, Spinner } from 'ui';
import { useNotify } from 'hooks/useNotify';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { PATHS } from 'const/paths';

export const Requests = ({
  modalController,
}: {
  modalController: ModalController;
}) => {
  const [requests, setRequests] = useState<SignRequest[]>([]);
  const [title, setTitle] = useState('');
  const address = useAddress();
  const { apiCreateSignRequest, apiGetSignRequests } = useAxios();
  const notify = useNotify();

  const createSignReq = useRequest((data) => apiCreateSignRequest(data), {
    onSuccess: (res: AxiosResponse<SignRequest>) => {
      setRequests([res.data, ...requests]);
      modalController.close();
      setTitle('');
      notify.success('Talep oluşturuldu');
    },
  });

  const getSignRequestsReq = useRequest(
    (address: string) => apiGetSignRequests({ sender: address }),
    {
      onSuccess: (res: AxiosResponse<SignRequest[]>) => {
        setRequests(res.data);
      },
    },
  );

  useEffect(() => {
    if (address == null) {
      return;
    }
    getSignRequestsReq.exec(address);
  }, [address]);

  return (
    <div className="flex flex-col">
      <Modal
        closeOnClickOutside={false}
        width="540px"
        modalController={modalController}
      >
        <div className="flex flex-col w-full">
          <p className="text-xl font-semibold mb-4">Talep oluştur</p>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Talep ismi"
          />
          <Button
            disabled={title.trim() === ''}
            onClick={() => {
              console.log('here');
              if (address == null && title.trim() === '') {
                return;
              }
              createSignReq.exec({
                sender: address,
                title,
              });
            }}
            color="primary"
            className="mt-4"
          >
            Oluştur
          </Button>
        </div>
      </Modal>
      {getSignRequestsReq.loading && (
        <div
          style={{ minHeight: '60vh' }}
          className="w-full h-full flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
      {requests.length === 0 && !getSignRequestsReq.loading ? (
        <div className="mt-2 flex justify-center">
          <span>Talebiniz bulunmamaktadır</span>
        </div>
      ) : (
        <div className="pt-4">
          {requests.map((item, key) => (
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
              <Link href={`${PATHS.request}/${item._id}`}>
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
