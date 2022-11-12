import { Container, Layout } from '@ethylene/components';
import { Navbar } from 'components';

const Noter = () => {
  return (
    <Layout>
      <Navbar state="active" />
      <div className="main">
        <Container className="pt-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 bg-neutral-300">asfafs</div>
            <div className="col-span-9 bg-neutral-300">asfafs</div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Noter;
