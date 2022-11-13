import Axios from 'axios';
import { SignRequest, SubmitDocumentInput } from 'types/app';

const axios = Axios.create({
  baseURL: 'http://localhost:8000',
});

export const useAxios = () => {
  const apiCreateSignRequest = (data: SignRequest) =>
    axios.post('/requests', data);

  const apiGetSignRequests = (params: { sender: string }) =>
    axios.get('/requests', { params: params });

  const apiGetSignApprovals = (data: { sender: string }) =>
    axios.post('/requests/approvals', data);

  const apiGetSignRequestById = (id: string) => axios.get(`/requests/${id}`);

  const apiSubmitDocument = (id: string, data: SubmitDocumentInput) =>
    axios.post(`/requests/${id}/submit`, data);

  const apiSubmitDocumentForSign = (id: string) =>
    axios.post(`/requests/${id}/submitForSign`);

  const apiGetDocumentVerification = (id: string) =>
    axios.get(`/requests/${id}/verification`);

  const apiVerifyDocument = (
    id: string,
    data: { sender: string; type: 'accepted' | 'rejected' },
  ) => axios.post(`/requests/${id}/verify`, data);

  const apiGetDocumentQr = (hash: string, params: { url?: string }) =>
    axios.get(`/documents/${hash}`, params);

  return {
    apiCreateSignRequest,
    apiGetDocumentQr,
    apiGetDocumentVerification,
    apiGetSignApprovals,
    apiGetSignRequestById,
    apiGetSignRequests,
    apiSubmitDocument,
    apiSubmitDocumentForSign,
    apiVerifyDocument,
  };
};
