import { useGlobalDispatch, useTypedSelector } from 'store';
import { setUser } from 'store/Auth';
import { User } from 'types/app';

export const useAuthorizedUser = () => {
  return useTypedSelector((state) => state.auth.user);
};
export const useSetAuthorizedUser = () => {
  const dispatch = useGlobalDispatch();
  return (user: User | null) => dispatch(setUser(user));
};
