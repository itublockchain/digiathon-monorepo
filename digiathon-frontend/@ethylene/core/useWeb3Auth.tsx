import { Web3Auth } from '@web3auth/web3auth';
import { __dev__ } from '@ethylene/utils';
import {
  useIsConnected,
  useSetAddress,
  useSetIsConnected,
  useSetIsConnecting,
  useSetProvider,
  useSetSigner,
  useSetWeb3AuthInstance,
  useWeb3AuthInstance,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { CONFIG } from 'config';
import { batch } from 'react-redux';
import { EthyleneWeb3AuthConnector } from '@ethylene/types';
import { UseConnectionProps } from '@ethylene/types/app';
import { ethers } from 'ethers';
import { useResetWeb3Connection } from '@ethylene/core/useResetWeb3Connection';
import { useState } from 'react';

export function useWeb3Auth({
  onError,
  onConnect,
}: UseConnectionProps | undefined = {}): EthyleneWeb3AuthConnector {
  const [connecting, setConnecting] = useState(false);
  const isConnected = useIsConnected();
  const setIsConnected = useSetIsConnected();
  const setWeb3AuthInstance = useSetWeb3AuthInstance();
  const setIsConnecting = useSetIsConnecting();
  const web3AuthInstance = useWeb3AuthInstance();
  const setProvider = useSetProvider();
  const resetWeb3Connection = useResetWeb3Connection();
  const setSigner = useSetSigner();
  const setAddress = useSetAddress();

  const getInstance = (): Web3Auth | null => {
    if (CONFIG.WEB3AUTH_CHAIN_CONFIG == null) return null;
    const clientId = CONFIG.WEB3AUTH_CLIENT_ID;
    const _web3AuthInstance = new Web3Auth({
      chainConfig: CONFIG.WEB3AUTH_CHAIN_CONFIG,
      clientId: String(clientId),
      uiConfig: {
        appLogo: CONFIG.APP_LOGO_SM_DARK,
        theme: CONFIG.INITIAL_THEME,
      },
    });
    return _web3AuthInstance;
  };

  const connect = async (): Promise<void> => {
    const web3AuthInstance = getInstance();

    if (web3AuthInstance == null) {
      return;
    }

    try {
      batch(async () => {
        setIsConnecting(true);
        setConnecting(true);

        await web3AuthInstance.initModal();
        await web3AuthInstance.connect();
        setIsConnected(true);
        setWeb3AuthInstance(web3AuthInstance);
        const _provider = new ethers.providers.Web3Provider(
          web3AuthInstance.provider as ethers.providers.ExternalProvider,
        );
        setProvider(_provider);

        const _signer = _provider.getSigner();
        setSigner(_signer);
        const address = await _signer.getAddress();
        setAddress(address);

        localStorage.setItem(`${CONFIG.APP}ConnectionType`, 'web3auth');
        setConnecting(false);
        setIsConnecting(false);
      });
      onConnect?.();
    } catch (err) {
      if (__dev__) {
        console.error(err);
      }

      setConnecting(false);
      setIsConnecting(false);
      onError?.();
    }
  };

  const disconnect = async (): Promise<void> => {
    if (web3AuthInstance == null || !isConnected) return;
    try {
      await web3AuthInstance.logout();
      web3AuthInstance.clearCache();
      resetWeb3Connection();
    } catch (err) {
      if (__dev__) {
        console.error(err);
      }
    }
  };

  return { connect, disconnect, isConnecting: connecting };
}
