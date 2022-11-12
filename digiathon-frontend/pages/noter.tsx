import { Container, Layout } from '@ethylene/components';
import { clsnm } from '@ethylene/utils';
import { Navbar } from 'components';
import { Requests } from 'components/Requests';
import { PATHS } from 'const/paths';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthorizedUser } from 'store/AuthHooks';
import { Button } from 'ui';

enum Page {
  requests = 'Talepler',
  approvals = 'Approvials',
}

const Noter = () => {
  const [page, setPage] = useState<Page>(Page.requests);
  const authorizedUser = useAuthorizedUser();
  const router = useRouter();

  const isPageActive = (_page: Page) => page === _page;

  const formatPageName = (page: Page) => {
    switch (page) {
      case Page.approvals:
        return 'Onaylarım';
      case Page.requests:
        return 'Taleplerim';
    }
    return;
  };

  useEffect(() => {
    if (authorizedUser == null) {
      router.replace(PATHS.login);
    }
  }, [authorizedUser, router]);

  return (
    <Layout>
      <Navbar state="active" />
      <div className="main">
        <Container className="pt-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 bg-neutral-100 rounded-md p-2 min-h-maximum">
              <span className="mb-2 block">LOGO</span>

              <div
                onClick={() => setPage(Page.requests)}
                className={clsnm(
                  'py-2 px-1 flex w-full cursor-pointer hover:bg-neutral-200 rounded-md',
                  isPageActive(Page.requests) && 'bg-neutral-200',
                )}
              >
                Taleplerim
              </div>
              {authorizedUser?.type === 'signer' && (
                <div
                  onClick={() => setPage(Page.approvals)}
                  className={clsnm(
                    'py-2 px-1 flex w-full cursor-pointer hover:bg-neutral-200 rounded-md mt-2',
                    isPageActive(Page.approvals) && 'bg-neutral-200',
                  )}
                >
                  Onaylarım
                </div>
              )}
            </div>
            <div className="col-span-9">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  {formatPageName(page)}
                </span>
                <Button color="light">Talep oluştur</Button>
              </div>
              {page === Page.requests && <Requests />}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Noter;
