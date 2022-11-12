import { Container } from '@ethylene/components';
import { CONFIG } from 'config';
import { Button, DropdownMenu } from 'ui';
import { IoEnterOutline } from 'react-icons/io5';
import Link from 'next/link';
import { clsnm } from '@ethylene/utils';
import { useRouter } from 'next/router';
import { PATHS } from 'const/paths';
import { useConnection, useIsConnected } from '@ethylene/hooks';
import { useAuthorizedUser } from 'store/AuthHooks';
import { useEffect } from 'react';
import { useDropdown } from 'hooks';

export const Navbar = ({
  state = 'default',
}: {
  state?: 'active' | 'default';
}) => {
  const router = useRouter();
  const { disconnect } = useConnection();
  const isConnected = useIsConnected();
  const authorizedUser = useAuthorizedUser();

  useEffect(() => {
    if (authorizedUser == null) {
      router.push(PATHS.intro);
    }
  }, [authorizedUser, router]);

  const { floating, reference, popperStyles, toggle, isOpen, closeRef } =
    useDropdown({
      leftDistance: 0,
      placement: 'bottom-end',
      topDistance: 12,
    });

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
          {!isConnected ? (
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
            <div ref={closeRef}>
              <Button
                forwardedRef={reference}
                onClick={toggle}
                size="small"
                className="pl-4 pr-4"
                color="light"
                rightIcon={<IoEnterOutline />}
              >
                {authorizedUser?.fullname}
              </Button>
              {isOpen && (
                <div ref={floating} style={popperStyles}>
                  <DropdownMenu disablePadding>
                    <div
                      onClick={() => {
                        disconnect();
                        router.replace(PATHS.intro);
                      }}
                      className="bg-white hover:bg-neutral-100 active:bg-neutral-200 py-2 px-2 rounded-md cursor-pointer"
                    >
                      <span className="text-sm font-light">Çıkış yap</span>
                    </div>
                  </DropdownMenu>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
