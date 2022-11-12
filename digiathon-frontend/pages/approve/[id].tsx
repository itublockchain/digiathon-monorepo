import { Container, Layout } from '@ethylene/components';
import { useAddress, useIsConnected } from '@ethylene/hooks';
import { useRequest } from '@ethylene/hooks/useApiRequest';
import { useModal } from '@ethylene/ui-hooks';
import { Navbar } from 'components';
import { useNotify } from 'hooks/useNotify';
import { useQueryParams } from 'hooks/useQueryParams';
import { useEffect, useRef, useState } from 'react';
import { SignRequest } from 'types/app';
import { Button, Modal, Spinner } from 'ui';
import { useAxios } from 'utils/requestService';

const formatPageName = (requestId: string) => {
  return `İstek - ${requestId}`;
};

const Approve = () => {
  const { apiGetSignRequestById } = useAxios();
  const isConnected = useIsConnected();
  const { id } = useQueryParams<{ id: string }>();
  const [request, setRequest] = useState<SignRequest | null>(null);

  useEffect(() => {
    if (!isConnected || !id) return;

    getSignRequestReq.exec(id);
  }, [isConnected, id]);

  const getSignRequestReq = useRequest(
    (id: string) => apiGetSignRequestById(id),
    {
      onSuccess: (res) => {
        setRequest(res.data);
      },
    },
  );
  const modal = useModal();

  return (
    <Layout>
      <Navbar state="active" />
      <Modal
        modalController={modal}
        width="768px"
        bodyProps={{ style: { minHeight: '90vh' } }}
      >
        <iframe
          className="w-full"
          style={{ height: '90vh' }}
          src={request?.document?.data}
        />
      </Modal>
      <div className="main">
        <Container className="pt-2">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-1"></div>
            <div className="col-span-10">
              {getSignRequestReq.loading || request?.document?.data == null ? (
                <div
                  className="flex items-center justify-center"
                  style={{ minHeight: '50vh' }}
                >
                  <Spinner />
                </div>
              ) : (
                <div className="flex flex-col w-full bg-white shadow-md mt-10 rounded-md">
                  <div className="flex items-center w-full h-12 bg-neutral-100 rounded-t-md pl-4">
                    <span>Başlık: {request.title}</span>
                  </div>
                  <div className="bg-white h-max rounded-b-md p-6">
                    <span className="text-lg font-medium mb-4 block">
                      İmzalanacak belgeler: 1 Belge
                    </span>

                    {request.document?.data != null && (
                      <div className="flex items-center space-x-4">
                        <Button color="light" onClick={modal.open}>
                          Görüntüle
                        </Button>
                        <Button color="success" onClick={modal.open}>
                          Onayla
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-1"></div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Approve;
