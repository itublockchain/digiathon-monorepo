import { UserById } from 'types/app';

export const usersById: { [key: string]: UserById } = {
  '1111': {
    passwordHash: '1111',
    fullname: 'Farhad Asgarov',
    account: '0xd0c3386D693A303f66cE76C79CD1549DFB5F1e0D',
    type: 'user',
  },
  '2222': {
    passwordHash: '2222',
    fullname: 'Merve Hatun Özcan',
    account: '0x9a21E8D151Fa79Db39d9bC5A3577Fa1DfAeF252C',
    type: 'signer',
  },
  '1112': {
    passwordHash: '1112',
    fullname: 'Muhittin Köybaşı',
    account: '0x9B8990Fd2cE1F6633499953B3B27a0E15Ff3eb9b',
    type: 'user',
  },
  '4444': {
    passwordHash: '4444',
    fullname: 'Tahir Özpala',
    account: '0xA63A810228a180767d3502EF8d21DbF4Da0D6b43',
    type: 'signer',
  },
  '5555': {
    passwordHash: '5555',
    fullname: 'Noter Test',
    account: '0xE0fEb9D91814ed35099dee7640045dFD1b80e86e',
    type: 'signer',
  },
};
