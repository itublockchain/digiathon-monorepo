import { Container, Layout } from '@ethylene/components';
import {
  useAddress,
  useContractFunction,
  useIsConnected,
} from '@ethylene/hooks';
import { useRequest } from '@ethylene/hooks/useApiRequest';
import { useModal } from '@ethylene/ui-hooks';
import { clsnm } from '@ethylene/utils';
import { Navbar } from 'components';
import { ABI } from 'const/abi';
import { BELGE } from 'const/address';
import { ethers } from 'ethers';
import { useNotify } from 'hooks/useNotify';
import { useQueryParams } from 'hooks/useQueryParams';
import { useEffect, useRef, useState } from 'react';
import { SignRequest, SubmitDocumentInput } from 'types/app';
import { Button, Modal, Spinner } from 'ui';
import { fileToBase64 } from 'utils/fileToBase64';
import { useAxios } from 'utils/requestService';

const hashValue = (val: string): string => {
  return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(val));
};

const Request = () => {
  const {
    apiGetSignRequestById,
    apiSubmitDocument,
    apiSubmitDocumentForSign,
    apiGetDocumentQr,
  } = useAxios();
  const isConnected = useIsConnected();
  const { id } = useQueryParams<{ id: string }>();
  const [request, setRequest] = useState<SignRequest | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const notify = useNotify();
  const address = useAddress();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [b64, setB64] = useState<string | null>(null);
  const modal = useModal();
  const qrModal = useModal();

  const [verif, setVerif] = useState<any>(null);
  const [qrData, setQrData] = useState<any>(null);

  const getSignRequestReq = useRequest(
    (id: string) => apiGetSignRequestById(id),
    {
      onSuccess: (res) => {
        setRequest(res.data);
        if (res.data.document != null) {
          setB64(res.data.document.data);
          setSignature(res.data.document.hash);
        }
        if (res.data.verification != null) {
          setVerif(res.data.verification);
        }
      },
    },
  );
  const getQrDataReq = useRequest((id: string) => apiGetDocumentQr(id), {
    onSuccess: (res) => {
      setQrData(res.data);
    },
  });

  useEffect(() => {
    if (verif != null && request != null) {
      getQrDataReq.exec(request.document?.hash);
    }
  }, [verif, request]);

  const submitReq = useRequest(
    (id: string, data: SubmitDocumentInput) => apiSubmitDocument(id, data),
    {
      onSuccess: (res) => {
        setRequest(res.data);
        notify.success('Belgeyi başarıyla imzaladınız!');
        if (id != null) {
          getSignRequestReq.exec(id);
        }
      },
    },
  );

  const submitForSignReq = useRequest(
    (id: string) => apiSubmitDocumentForSign(id),
    {
      onSuccess: () => {
        if (id == null) return;
        getSignRequestReq.exec(id);
      },
    },
  );

  const sendApproveTxn = useContractFunction({
    abi: ABI,
    address: BELGE,
    method: 'bireyselBelgeOlustur',
    onSuccess: () => {
      if (b64 == null || request == null) {
        return;
      }
      submitReq.exec(request._id, {
        data: b64,
        hash: hashValue(b64),
      });
    },
  });

  const sign = async () => {
    if (b64 != null) {
      const hashVal = hashValue(b64);
      sendApproveTxn.write(hashVal);
    }
  };

  const formatPageName = (requestId: string) => {
    return `İstek - ${requestId}`;
  };

  useEffect(() => {
    if (!isConnected || !id) return;

    getSignRequestReq.exec(id);
  }, [isConnected, id]);

  useEffect(() => {
    const convert = async () => {
      if (file == null) {
        return;
      }
      try {
        const b64 = await fileToBase64(file);
        setB64(b64);
      } catch (err) {
        notify.info('Dosya deskteklenmiyor');
      }
    };
    convert();
  }, [file, notify, address]);

  return (
    <Layout>
      <Navbar state="active" />
      {b64 != null && (
        <Modal
          modalController={modal}
          width="768px"
          bodyProps={{ style: { minHeight: '90vh' } }}
        >
          <iframe className="w-full" style={{ height: '90vh' }} src={b64} />
        </Modal>
      )}
      {qrData != null && (
        <Modal
          bodyProps={{ style: { maxHeight: '95vh' } }}
          width="720px"
          modalController={qrModal}
        >
          <div className="flex-col overflow-auto">
            <iframe
              className="w-full"
              style={{
                minHeight: '640px',
                zIndex: 1,
              }}
              src={qrData.data}
            />
            <iframe
              style={{
                width: '300px',
                height: '300px',
                position: 'fixed',
                left: '150x',
                bottom: '25%',
              }}
              src={qrData.image}
            />
          </div>
        </Modal>
      )}

      <div className="main">
        <Container className="pt-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-1"></div>
            <div className="col-span-10">
              {getSignRequestReq.loading || request == null ? (
                <div
                  className="flex items-center justify-center"
                  style={{ minHeight: '50vh' }}
                >
                  <Spinner />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      {formatPageName(request?._id)}
                    </span>
                  </div>
                  <div className="flex flex-col w-full bg-white shadow-md mt-10 rounded-md">
                    <div className="flex items-center w-full h-12 bg-neutral-100 rounded-t-md pl-4">
                      <span>Adım 1: Belgenizi yükleyin</span>
                    </div>
                    <div className="bg-white h-max rounded-b-md p-6">
                      <div className="flex justify-between items-center p-2 border-2 border-neutral-300 rounded-md">
                        <input
                          ref={inputRef}
                          onChange={(e) => {
                            if (e.target.files != null) {
                              setFile(e.target.files[0]);
                              setSignature(null);
                            }
                          }}
                          type="file"
                        />
                        <Button
                          onClick={() => {
                            inputRef.current?.click();
                          }}
                          color="primary"
                        >
                          Dosya seç
                        </Button>
                      </div>
                      {b64 != null && (
                        <span
                          onClick={modal.open}
                          className="mt-2 block text-blue-500 cursor-pointer"
                        >
                          Önizleme
                        </span>
                      )}
                      {signature != null && (
                        <span className="mt-2 text-xs block cursor-pointer">
                          Belge başarıyla imzalandı gönderime hazır durumda
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={clsnm(
                      'flex flex-col w-full bg-white shadow-md mt-10 rounded-md',
                      b64 == null && 'pointer-events-none opacity-50',
                    )}
                  >
                    <div className="flex items-center w-full h-12 bg-neutral-100 rounded-t-md pl-4">
                      <span>Adım 2: Belgenizi imzalayın</span>
                    </div>
                    <div className="bg-white h-max rounded-b-md p-6">
                      <Button
                        disabled={request.submitted}
                        loading={sendApproveTxn.isLoading || submitReq.loading}
                        onClick={sign}
                        color="success"
                      >
                        Birey olarak imzala
                      </Button>
                      <span className="mt-4 block">
                        Bu işlemi tamamlamak için Metamask ve benzeri bir cüzdan
                        kullanabiliriniz. Onayla tuşuna bastığınızdan sonra size
                        atanmış özel cüzdanınızla birlikte belgenizi
                        imzalayabilirsiniz.
                      </span>
                    </div>
                  </div>

                  {verif != null && (
                    <div
                      className={clsnm(
                        'flex flex-col w-full bg-white shadow-md mt-10 rounded-md',
                        b64 == null && 'pointer-events-none opacity-50',
                      )}
                    >
                      <div className="flex items-center w-full h-12 bg-neutral-100 rounded-t-md pl-4">
                        <span>Belgeniz imzalanmıştır</span>
                      </div>
                      <div className="bg-white h-max rounded-b-md p-6">
                        <Button onClick={qrModal.open} color="light">
                          Görüntüle
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => submitForSignReq.exec(id)}
                    disabled={signature == null || request.submitted}
                    loading={submitForSignReq.loading}
                    color="primary"
                    className="ml-auto mt-4"
                  >
                    {request.submitted
                      ? 'İmza için gönderildi'
                      : 'İmza için gönder'}
                  </Button>
                </>
              )}
            </div>
            <div className="col-span-1"></div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Request;
