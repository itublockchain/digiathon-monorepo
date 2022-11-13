import { Container, Layout } from '@ethylene/components';
import { useRequest } from '@ethylene/hooks/useApiRequest';
import { Navbar } from 'components';
import { useQueryParams } from 'hooks/useQueryParams';
import { useEffect, useState } from 'react';

import { useAxios } from 'utils/requestService';

const Request = () => {
  const { apiGetDocumentQr } = useAxios();
  const [qrData, setQrData] = useState<any>(null);
  const { hash } = useQueryParams<{ hash: string }>();

  const getQrDataReq = useRequest(
    (id: string, params: any) => apiGetDocumentQr(id, params),
    {
      onSuccess: (res) => {
        setQrData(res.data);
      },
    },
  );

  useEffect(() => {
    if (hash != null) {
      getQrDataReq.exec(hash, { url: window.origin });
    }
  }, [hash]);

  return (
    <Layout>
      <Navbar state="active" />
      {qrData != null && (
        <Container className="pt-20">
          <div className="grid grid-cols-10">
            <div className="col-span-1"></div>
            <div className="col-span-8">
              <iframe
                style={{ minHeight: '90vh', width: '100%' }}
                src={qrData.data}
              />
            </div>
            <div className="col-span-1"></div>
          </div>
        </Container>
      )}
    </Layout>
  );
};

export default Request;
