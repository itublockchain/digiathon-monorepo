import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Page, UserById } from 'types/app';

export interface AuthState {
  page: Page;
  user: UserById | null;
}

const initialState: AuthState = {
  page: Page.requests,
  user: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setPage: (state, action: PayloadAction<Page>) => {
      state.page = action.payload;
    },
    setUser: (state, action: PayloadAction<UserById | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setPage } = authSlice.actions;

export default authSlice.reducer;
