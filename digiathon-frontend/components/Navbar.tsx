import { Container } from '@ethylene/components';
import { CONFIG } from 'config';
import { Button } from 'ui';
import { IoEnterOutline } from 'react-icons/io5';
import Link from 'next/link';
import { clsnm } from '@ethylene/utils';
import { useRouter } from 'next/router';
import { PATHS } from 'const/paths';
import { useIsConnected } from '@ethylene/hooks';

export const Navbar = ({
  state = 'default',
}: {
  state?: 'active' | 'default';
}) => {
  const router = useRouter();
  const isConnected = useIsConnected();

  return (
    <div
      className={clsnm(
        `${state === 'active' ? 'bg-headerActive' : 'bg-header'}`,
        'w-full flex fixed top-0 left-0 durition-150 transition-all z-50',
      )}
    >
      <Container>
        <div className="flex justify-between items-center w-full ">
          <Link href={PATHS.intro}>
            <a>
              <img className="w-48" alt="logo" src={CONFIG.APP_LOGO} />
            </a>
          </Link>
          {isConnected ? (
            <Button
              onClick={() => router.push(PATHS.login)}
              size="small"
              className="pl-4 pr-4"
              color="light"
              rightIcon={<IoEnterOutline />}
            >
              Giriş yap
            </Button>
          ) : (
            <Button
              onClick={() => router.push(PATHS.login)}
              size="small"
              className="pl-4 pr-4"
              color="light"
              rightIcon={<IoEnterOutline />}
            ></Button>
          )}
        </div>
      </Container>
    </div>
  );
};
