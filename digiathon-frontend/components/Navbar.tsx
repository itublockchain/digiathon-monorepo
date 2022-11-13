import { Container } from '@ethylene/components';
import { CONFIG } from 'config';
import { Button, DropdownMenu } from 'ui';
import { IoEnterOutline } from 'react-icons/io5';
import Link from 'next/link';
import { clsnm } from '@ethylene/utils';
import { useRouter } from 'next/router';
import { PATHS } from 'const/paths';
import { useConnection, useIsConnected } from '@ethylene/hooks';
import { useAuthorizedUser, useSetAuthorizedUser } from 'store/AuthHooks';
import { useDropdown } from 'hooks';
import { connect } from 'http2';
import { useEffect } from 'react';
import { useAddress } from '@ethylene/redux/web3/Web3ReducerHooks';
import { useNotify } from 'hooks/useNotify';
import { useQueryParams } from 'hooks/useQueryParams';

export const Navbar = ({
  state = 'default',
}: {
  state?: 'active' | 'default';
}) => {
  const router = useRouter();
  const { disconnect } = useConnection();
  const isConnected = useIsConnected();
  const authorizedUser = useAuthorizedUser();
  const setAuthorizedUser = useSetAuthorizedUser();
  const address = useAddress();
  const notify = useNotify();

  const { connect } = useConnection({
    onConnect: () => {},
  });

  useEffect(() => {
    if (!address || !authorizedUser) {
      return;
    } else if (address != authorizedUser['account']) {
      notify.warn('Lütfen E-Devlet cüzdanızıla giriş yapınız');
      disconnect();
      return;
    }
  }, [address]);

  useEffect(() => {
    if (!isConnected) {
      router.push(PATHS.intro);
    }
  });

  const compactAddress = () => {
    return address
      ? address.substring(0, 5) +
          '....' +
          address.substring(address.length - 5, address.length)
      : '';
  };

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
          {!authorizedUser ? (
            <Button
              onClick={() => router.push(PATHS.login)}
              size="small"
              className="pl-4 pr-4 transition-all"
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
                style={isConnected ? { width: '300px' } : { width: '200px' }}
                size="small"
                className="pl-4 pr-4"
                color="light"
                rightIcon={<IoEnterOutline />}
              >
                {compactAddress()} {isConnected && '|'}{' '}
                {authorizedUser?.fullname}
              </Button>
              {isOpen && (
                <div ref={floating} style={popperStyles}>
                  <DropdownMenu disablePadding>
                    <div
                      onClick={() => {
                        if (isConnected) {
                          disconnect();
                          router.push(PATHS.intro);
                          return;
                        }
                        connect();
                      }}
                      className="bg-white hover:bg-neutral-100 active:bg-neutral-200 py-2 px-2 rounded-md cursor-pointer text-center"
                    >
                      <span className="text-sm font-light">
                        {!isConnected
                          ? 'Cüzdanımı Bağla'
                          : 'Cüzdan Bağlantısını Kes'}
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        setAuthorizedUser(null);
                        //disconnect();
                        router.replace(PATHS.intro);
                      }}
                      className="bg-white hover:bg-neutral-100 active:bg-neutral-200 py-2 px-2 rounded-md cursor-pointer text-center"
                    >
                      <span className="text-sm font-light text-right">
                        Çıkış yap
                      </span>
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
