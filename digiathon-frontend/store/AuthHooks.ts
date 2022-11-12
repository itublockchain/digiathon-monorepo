import { useGlobalDispatch, useTypedSelector } from 'store';
import { setPage, setUser } from 'store/Auth';
import { Page, User } from 'types/app';

export const useAuthorizedUser = () => {
  return useTypedSelector((state) => state.auth.user);
};
export const useSetAuthorizedUser = () => {
  const dispatch = useGlobalDispatch();
  return (user: User | null) => dispatch(setUser(user));
};

export const usePage = () => {
  return useTypedSelector((state) => state.auth.page);
};
export const useSetPage = () => {
  const dispatch = useGlobalDispatch();
  return (page: Page) => dispatch(setPage(page));
};
