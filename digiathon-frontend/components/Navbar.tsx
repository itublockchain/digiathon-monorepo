import { Container } from '@ethylene/components';
import { CONFIG } from 'config';

export const Navbar = () => {
  return (
    <div className="w-full flex fixed top-0 left-0 bg-header durition-150 transition-all">
      <Container>
        <img className="w-48" alt="logo" src={CONFIG.APP_LOGO} />
      </Container>
    </div>
  );
};
