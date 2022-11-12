export const ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'noterKayitAdresi',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes',
        name: 'belgeHashi',
        type: 'bytes',
      },
    ],
    name: 'AntlasmaNoterTarafindanImzalandi',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes',
        name: 'belgeHashi',
        type: 'bytes',
      },
    ],
    name: 'AntlasmaTumTaraflarTarafindanImzalandi',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes',
        name: 'belgeHashi',
        type: 'bytes',
      },
    ],
    name: 'BireyselBelgeNoterTarafindanImzanlandi',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'adresinBelgeleri',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_belgeHashi',
        type: 'bytes',
      },
      {
        internalType: 'address[]',
        name: '_taraflar',
        type: 'address[]',
      },
    ],
    name: 'antlasmaOlustur',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'antlasmalar',
    outputs: [
      {
        internalType: 'uint256',
        name: 'zamanDamgasi',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'imzalandiMi',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_belgeHashi',
        type: 'bytes',
      },
    ],
    name: 'antlasmayiKimImzaladi',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_belgeHashi',
        type: 'bytes',
      },
    ],
    name: 'bireyOlarakImzala',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_belgeHashi',
        type: 'bytes',
      },
    ],
    name: 'bireyselBelgeOlustur',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'bireyselBelgeler',
    outputs: [
      {
        internalType: 'uint256',
        name: 'zamanDamgasi',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'imzalayanNoter',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'imzalandiMi',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'hangiBelgeTuru',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'imzalanabilirBelgeler',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'imzalananBelgeler',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'noterKayit',
    outputs: [
      {
        internalType: 'contract NoterKayit',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_belgeHashi',
        type: 'bytes',
      },
    ],
    name: 'noterOlarakImzala',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
