import { useResetWeb3Connection } from '@ethylene/core/useResetWeb3Connection';
import {
  useIsConnected,
  useSetAddress,
  useSetIsConnected,
  useSetIsConnecting,
  useSetProvider,
  useSetSigner,
} from '@ethylene/redux/web3/Web3ReducerHooks';
import { EthyleneMetamaskConnector } from '@ethylene/types';
import { UseConnectionProps } from '@ethylene/types/app';
import { __dev__ } from '@ethylene/utils';
import { CONFIG } from 'config';
import { ethers } from 'ethers';
import { useState } from 'react';

declare let window: Window & {
  ethereum: ethers.providers.ExternalProvider;
};

export const useDefaultAuth = ({
  onError,
  onConnect,
}: UseConnectionProps | undefined = {}): EthyleneMetamaskConnector => {
  const [connecting, setConnecting] = useState(false);
  const isConnected = useIsConnected();
  const setIsConnected = useSetIsConnected();
  const setIsConnecting = useSetIsConnecting();
  const resetWeb3Connection = useResetWeb3Connection();
  const setProvider = useSetProvider();
  const setSigner = useSetSigner();
  const setAddress = useSetAddress();

  const connect = async (): Promise<void> => {
    try {
      setIsConnecting(true);
      setConnecting(true);

      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      setProvider(provider);

      const _signer = provider.getSigner();
      setSigner(_signer);
      const address = await _signer.getAddress();
      setAddress(address);

      setIsConnected(true);
      onConnect?.();

      localStorage.setItem(`${CONFIG.APP}ConnectionType`, 'injected');
      setIsConnecting(false);
      setConnecting(false);
    } catch (err) {
      if (__dev__) {
        console.error(err);
      }
      onError?.();

      setIsConnecting(false);
      setConnecting(false);
    }
  };

  const disconnect = async (): Promise<void> => {
    if (!isConnected) return;
    resetWeb3Connection();
  };

  return { connect, disconnect, isConnecting: connecting };
};
