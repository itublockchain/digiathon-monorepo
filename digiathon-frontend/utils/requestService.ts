import Axios from 'axios';
import { SignRequest } from 'types/app';

const axios = Axios.create({
  baseURL: 'http://localhost:8000',
});

export const useAxios = () => {
  const apiCreateSignRequest = (data: SignRequest) =>
    axios.post('/requests', data);

  const apiGetSignRequests = (params: { sender: string }) =>
    axios.get('/requests', { params: params });

  return { apiCreateSignRequest, apiGetSignRequests };
};
