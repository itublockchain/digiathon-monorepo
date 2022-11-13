import { clsnm } from '@ethylene/utils';
import { NextPage } from 'next';
import trLogin from '../assets/tr-login.png';
import { AiOutlineWallet, AiOutlineLock } from 'react-icons/ai';
import styles from 'styles/login.module.scss';
import { useEffect, useState } from 'react';
import { useAddress, useConnection, useIsConnected } from '@ethylene/hooks';
import { useRouter } from 'next/router';
import { PATHS } from 'const/paths';
import { useSetAuthorizedUser } from 'store/AuthHooks';
import { users } from 'const/users';
import { usersById } from 'const/usersByID';
import { useNotify } from 'hooks/useNotify';
import { add } from 'cypress/types/lodash';

const Login: NextPage = () => {
  const router = useRouter();
  const [loginChoose, setLoginChoose] = useState('password');
  const isConnected = useIsConnected();
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const address = useAddress();
  const { connect } = useConnection({
    onConnect: () => {},
  });
  const setAuthorizerUser = useSetAuthorizedUser();
  const notify = useNotify();

  // const authenticate = () => {
  //   const _user = users[id];
  //   if (_user != null) {
  //     setAuthorizerUser(_user);
  //     router.push(PATHS.noter);
  //   } else {
  //     notify.error('Kullanıcı eşleştirilemedi');
  //   }
  // };

  const submitForm = () => {
    if (id == '') return;
    const _user = usersById[id];
    if (password == '') return;
    if (!_user) {
      notify.warn('Geçersiz kimlik numarası');
      return;
    }
    if (password != _user['passwordHash']) {
      notify.error('Girdiğiniz şifre yanlıştır');
      setPassword('');
      return;
    }
    setAuthorizerUser(_user);
    router.push(PATHS.noter);
  };

  return (
    <div
      className={clsnm(
        'flex h-screen w-screen items-center justify-center',
        styles.bg,
      )}
    >
      <div className={clsnm(styles.outer)}>
        <header>
          <h1>Türkiye Cumhuriyeti Vatandaş Kimlik Doğrulama Sistemi</h1>
        </header>
        <main>
          <section>
            <h3>Giriş Yapılacak Adres: www.turkiye.gov.tr</h3>
            <h3>Giriş Yapılacak Uygulama: E-Devlet Kapısı</h3>
            <img
              className="float-right"
              src={trLogin.src}
              alt=""
              width="165"
              height="40"
            />
          </section>
          <nav className={clsnm(styles.methodSelector)}>
            <div className={clsnm(styles.tabChoser)}></div>
            {loginChoose == 'password' && (
              <section className={clsnm(styles.pageContent)}>
                <div className={clsnm(styles.richText)}>
                  T.C. Kimlik Numaranızı ve e-Devlet Şifrenizi kullanarak
                  kimliğiniz doğrulandıktan sonra işleminize kaldığınız yerden
                  devam edebilirsiniz.
                </div>
                <div className={clsnm(styles.fieldSet)}>
                  <form
                    onSubmit={(event) => event.preventDefault()}
                    className={clsnm(styles.inputForm)}
                  >
                    <div className={clsnm(styles.formRow)}>
                      <label className={clsnm(styles.rowLabel)}>
                        T.C. Kimlik No
                      </label>
                      <input
                        required
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                        type="text"
                      ></input>
                    </div>
                    <div className={clsnm(styles.formRow)}>
                      <label className={clsnm(styles.rowLabel)}>
                        E-Devlet Şifresi
                      </label>
                      <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                      ></input>
                      <div className={clsnm(styles.fieldInfo, styles.richText)}>
                        * e-Devlet şifrenizi unutmanız durumunda doğruladığınız
                        cep telefonunuzdan yenileme işlemi yapabilirsiniz.
                      </div>
                    </div>
                    <div
                      className={clsnm(
                        'flex justify-center items-center',
                        styles.formSubmit,
                      )}
                    >
                      <button className={clsnm(styles.backButton)}>
                        {'İptal'}
                      </button>
                      <button
                        className={clsnm(styles.submitButton)}
                        onClick={() => submitForm()}
                      >
                        Giriş Yap
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            )}
            {loginChoose == 'wallet' && (
              <div className="h-60 flex justify-center items-center">
                <button
                  onClick={() => {
                    if (!isConnected) {
                      connect('injected');
                    } else {
                      authenticate();
                    }
                  }}
                  className={clsnm(' w-auto h-5', styles.submitButton)}
                >
                  Mobil Cüzdanımı Bağla
                </button>
              </div>
            )}
          </nav>
        </main>
      </div>
    </div>
  );
};

export default Login;
