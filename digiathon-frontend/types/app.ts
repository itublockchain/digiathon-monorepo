export type User = {
  fullname: string;
  tcId: string;
  type: 'signer' | 'user';
};

export type SignRequestInput = {
  sender: string;
  title: string;
};

export type SignRequest = {
  _id: string;
  sender: string;
  title: string;
  created: number;
};

export enum Page {
  requests = 'Talepler',
  approvals = 'Approvials',
}
