import { Layout } from '@ethylene/components';
import { Navbar } from 'components';
import type { NextPage } from 'next';
import IntroBg from 'assets/intro-bg.png';

const Home: NextPage = () => {
  return (
    <Layout>
      <Navbar />
      <div className="flex w-full h-96">
        <img src={IntroBg.src} className="object-cover" alt="Intro" />
      </div>
    </Layout>
  );
};

export default Home;
