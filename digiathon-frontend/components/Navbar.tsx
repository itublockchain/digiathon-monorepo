import { Container } from '@ethylene/components';
import { CONFIG } from 'config';
import { Button } from 'ui';
import { IoEnterOutline } from 'react-icons/io5';

export const Navbar = () => {
  return (
    <div className="w-full flex fixed top-0 left-0 bg-header durition-150 transition-all">
      <Container>
        <div className="flex justify-between items-center w-full">
          <img className="w-48" alt="logo" src={CONFIG.APP_LOGO} />
          <Button color="light" rightIcon={<IoEnterOutline />}>
            Giriş yap
          </Button>
        </div>
      </Container>
    </div>
  );
};
