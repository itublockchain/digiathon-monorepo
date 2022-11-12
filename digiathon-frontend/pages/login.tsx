import { clsnm } from '@ethylene/utils';
import { NextPage } from 'next';
import styles from 'styles/login.module.scss';

const Login: NextPage = () => {
  return (
    <div
      className={clsnm(
        'flex h-screen w-screen items-center justify-center',
        styles.bg,
      )}
    >
      Login
    </div>
  );
};

export default Login;
