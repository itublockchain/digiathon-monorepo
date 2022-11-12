import '@ethylene/styles/global.scss';
import type { AppProps } from 'next/app';
import { EthyleneProvider } from '@ethylene/redux';
import { useStyling } from 'hooks/useStyling';
import { useInitializeWeb3 } from '@ethylene/core/useInitializeWeb3';
import { useInitialTheme } from '@ethylene/ui-hooks';
import { StateProvider } from 'store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOnAccountsChange } from '@ethylene/hooks';

function EthyleneApp({ Component, pageProps }: AppProps) {
  return (
    <EthyleneProvider>
      <StateProvider>
        <>
          <InitHooks />
          <Component {...pageProps} />
          <ToastContainer draggable theme={'light'} />
        </>
      </StateProvider>
    </EthyleneProvider>
  );
}

function InitHooks(): null {
  useStyling();
  useInitializeWeb3();
  useInitialTheme();

  useOnAccountsChange(() => {
    window.location.reload();
  }, 1000);

  return null;
}

export default EthyleneApp;
