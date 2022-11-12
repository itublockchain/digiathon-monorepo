import { BaseConfig, ExtraConfig } from 'config/config.types';
import { ETHEREUM_MAINNET } from '@ethylene/constants';
import { GEORLI } from '@ethylene/constants/networks';
import Logo from 'assets/logo.png';

const EXTRA_CONFIG = {};

export const CONFIG: BaseConfig<ExtraConfig> = {
  APP: 'Digiathon', // ! Do not use names with space, only use valid variable names !
  APP_DESCRIPTION: 'Customizable boilerplate dAPP project',
  APP_LOGO: Logo.src,
  APP_LOGO_DARK: Logo.src,
  APP_LOGO_SM: Logo.src,
  APP_LOGO_SM_DARK: Logo.src,
  CONNECTION: 'injected', // See EthyleneConnectionType for more options
  FAVICON_PATH: '/favicon.ico', // Root located at /public
  FONT_FAMILY: '"Open Sans", sans-serif',
  INITIAL_THEME: 'light',
  MORALIS: {
    API_KEY: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    ENABLED: true,
  },
  REMEMBER_ME: true,
  WALLETCONNECT: {
    rpc: {
      1: ETHEREUM_MAINNET.rpcUrls[0],
      5: GEORLI.rpcUrls[0],
      // ...
    },
  },
};
