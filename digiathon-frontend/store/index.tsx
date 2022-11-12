import { MixedElement } from '@ethylene/types';
import { configureStore } from '@reduxjs/toolkit';
import React, { createContext } from 'react';
import {
  TypedUseSelectorHook,
  Provider,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux';
import authSlice from 'store/auth';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    const customizedMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    return customizedMiddleware;
  },
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const ethyleneStoreContext = createContext<any>(null);
export const useEthyleneDispatch = createDispatchHook(
  ethyleneStoreContext as any,
);
export const useEthyleneSelector = createSelectorHook(
  ethyleneStoreContext as any,
);
export const useTypedEthyleneSelector: TypedUseSelectorHook<RootState> =
  useEthyleneSelector;

type EthyleneProviderProps = {
  children: MixedElement;
};

export const StateProvider = ({ children }: EthyleneProviderProps) => {
  return (
    <Provider context={ethyleneStoreContext} store={store}>
      {children}
    </Provider>
  );
};
