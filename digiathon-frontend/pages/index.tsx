import { Layout } from '@ethylene/components';
import { Navbar } from 'components';
import type { NextPage } from 'next';
import IntroBg from 'assets/intro-bg.png';
import Banner from 'assets/banner2.png';
import { Input, Typography } from 'ui';
import { FaSearch, FaFileSignature } from 'react-icons/fa';
import { TbRotateDot } from 'react-icons/tb';
import Mobile from 'assets/mobile.png';
import Link from 'next/link';
import { useIsConnected } from '@ethylene/hooks';
import { useNotify } from 'hooks/useNotify';
import { useAuthorizedUser } from 'store/AuthHooks';

const Home: NextPage = () => {
  const isConnected = useIsConnected();
  const notify = useNotify();
  const authorizedUser = useAuthorizedUser();
  return (
    <Layout>
      <Navbar />
      <div className="flex w-full items-center justify-center h-96 relative">
        <img
          src={IntroBg.src}
          className="object-cover h-full w-full opacity-90"
          alt="Intro"
        />
        <div className="w-2/5 z-10 top-1/2 absolute flex flex-col items-center">
          <div className="relative flex w-full">
            <Input
              containerClassName="w-full"
              className="w-full h-12"
              placeholder="Merhaba, size nasıl yardım edebilirim?"
            />
            <div className="absolute right-4 top-4 text-neutral-600">
              <FaSearch />
            </div>
          </div>
          <Typography
            style={{ textShadow: '1px 1px 2px #214260' }}
            extendColor
            className="text-white whitespace-nowrap font-light drop-shadow-lg mt-4 text-sm"
          >
            e-Devlet Kapısı ile bilgi ve belgelerinize tek noktadan ulaşabilir,
            başvuru işlemlerinizi hızla gerçekleştirebilirsiniz
          </Typography>
        </div>
      </div>
      <div
        className="w-full flex justify-center -translate-y-12 space-x-4"
        id="services"
      >
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-mainBlue hover:bg-mainBlueHover text-white border-4 border-white cursor-pointer">
            <TbRotateDot className="text-3xl" />
          </div>
          <span className="font-semibold text-lg mt-2">e-Hizmetler</span>
          <span className="font-light text-xs mt-1">
            Sorgulama, Başvuru ve Ödeme hizmetleri.
          </span>
        </div>
        {isConnected || !authorizedUser ? (
          <Link href="/anasayfa" className="flex flex-col items-center">
            <a className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-mainBlue hover:bg-mainBlueHover text-white border-4 border-white cursor-pointer">
                <FaFileSignature className="text-3xl" />
              </div>
              <span className="font-semibold text-lg mt-2">e-Noter</span>
              <span className="font-light text-xs mt-1">
                Blok zincir tabanlı elektronik noter ve imzalama hizmetleri
              </span>
            </a>
          </Link>
        ) : (
          <button
            className="flex flex-col items-center"
            onClick={() => {
              notify.warn('Lütfen E-Devlet cüzdanınızı bağlayınız');
            }}
          >
            <a className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-mainBlue hover:bg-mainBlueHover text-white border-4 border-white cursor-pointer">
                <FaFileSignature className="text-3xl" />
              </div>
              <span className="font-semibold text-lg mt-2">e-Noter</span>
              <span className="font-light text-xs mt-1">
                Blok zincir tabanlı elektronik noter ve imzalama hizmetleri
              </span>
            </a>
          </button>
        )}
      </div>
      <div className="relative w-full flex justify-center min-h-96 mt-8">
        <img src={Banner.src} className="mt-12 w-full" alt="mobile platform" />
      </div>
      <div className="relative w-full flex justify-center min-h-96 mt-8">
        <img src={Mobile.src} className="mt-12 w-full" alt="mobile platform" />
        <div className="absolute translate-x-72 top-48 flex flex-col w-96">
          <span className="font-light text-2xl">
            Mobil Cihazlar için e-Devlet Kapısı
          </span>
          <span className="font-light mt-2 text-sm">
            e-Devlet Kapısı Mobil ile e-hizmetlere Android, iPhone, iPad ve
            Huawei cihazlarınızdan kolayca erişebilir, Anlık Bilgilendirme ile
            gelişmelerden vakit kaybetmeden haberdar olabilirsiniz.
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
