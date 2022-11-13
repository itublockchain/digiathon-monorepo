export type User = {
  fullname: string;
  tcId: string;
  type: 'signer' | 'user';
};

export type UserById = {
  passwordHash: string;
  fullname: string;
  account: string;
  type: 'signer' | 'user';
}

export type SignRequestInput = {
  sender: string;
  title: string;
};

export type SubmitDocumentInput = {
  data: string;
};

export type SignRequest = {
  _id: string;
  sender: string;
  title: string;
  created: number;
  submitted: boolean;
  document?: {
    _id: string;
    hash: string;
    data: string;
    submitted: string;
  } | null;
};

export enum Page {
  requests = 'Talepler',
  approvals = 'Approvials',
}
