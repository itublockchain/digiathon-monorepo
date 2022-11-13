import { Container, Layout } from '@ethylene/components';
import {
  useAddress,
  useContractFunction,
  useIsConnected,
} from '@ethylene/hooks';
import { useRequest } from '@ethylene/hooks/useApiRequest';
import { useModal } from '@ethylene/ui-hooks';
import { Navbar } from 'components';
import { ABI } from 'const/abi';
import { BELGE } from 'const/address';
import { useNotify } from 'hooks/useNotify';
import { useQueryParams } from 'hooks/useQueryParams';
import { useEffect, useState } from 'react';
import { SignRequest } from 'types/app';
import { Button, Modal, Spinner } from 'ui';
import { useAxios } from 'utils/requestService';

const Approve = () => {
  const {
    apiGetSignRequestById,
    apiGetDocumentVerification,
    apiVerifyDocument,
  } = useAxios();
  const isConnected = useIsConnected();
  const { id } = useQueryParams<{ id: string }>();
  const [request, setRequest] = useState<SignRequest | null>(null);
  const [verif, setVerif] = useState<any>(null);
  const notify = useNotify();
  const address = useAddress();

  useEffect(() => {
    if (!isConnected || !id) return;

    getDocumentVerification.exec(id);
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

  const getDocumentVerification = useRequest(
    (id: string) => apiGetDocumentVerification(id),
    {
      onSuccess: (res) => {
        setVerif(res.data);
      },
    },
  );

  const verifyDocumentReq = useRequest(
    (id: string, data: { sender: string; type: 'accepted' | 'rejected' }) =>
      apiVerifyDocument(id, data),
    {
      onSuccess: (res) => {
        setVerif(res.data);
      },
    },
  );

  const modal = useModal();

  const signTxn = useContractFunction({
    abi: ABI,
    address: BELGE,
    method: 'noterOlarakImzala',
    onSuccess: () => {
      notify.success('Belge başarıyla onaylandı');
      verifyDocumentReq.exec(id, { sender: address, type: 'accepted' });
    },
  });

  const sign = () => {
    if (request == null) {
      return;
    }
    signTxn.write(request.document?.hash);
  };

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
                        <Button
                          loading={signTxn.isLoading}
                          onClick={sign}
                          color="success"
                          disabled={verif != null}
                        >
                          Onayla
                        </Button>
                      </div>
                    )}
                    {verif != null && (
                      <span className="mt-4 block">
                        Bu belgeyi başarıyla onayladınız
                      </span>
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
