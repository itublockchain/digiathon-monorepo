import { MixedElement } from '@ethylene/types';
import { configureStore } from '@reduxjs/toolkit';
import React, { createContext } from 'react';
import {
  TypedUseSelectorHook,
  Provider,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux';
import authSlice from 'store/Auth';

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

export const context = createContext<any>(null);
export const useGlobalDispatch = createDispatchHook(context as any);
export const useGlobalSelector = createSelectorHook(context as any);
export const useTypedSelector: TypedUseSelectorHook<RootState> =
  useGlobalSelector;

type EthyleneProviderProps = {
  children: MixedElement;
};

export const StateProvider = ({ children }: EthyleneProviderProps) => {
  return (
    <Provider context={context} store={store}>
      {children}
    </Provider>
  );
};
