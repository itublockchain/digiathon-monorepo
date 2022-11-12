import { Container, Layout } from '@ethylene/components';
import { useModal } from '@ethylene/ui-hooks';
import { Navbar } from 'components';
import { Requests } from 'components/Requests';
import { Sidebar } from 'components/Sidebar';
import { PATHS } from 'const/paths';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthorizedUser } from 'store/AuthHooks';
import { Button } from 'ui';

const Request = () => {
  const authorizedUser = useAuthorizedUser();
  const router = useRouter();

  const formatPageName = (page: Page) => {
    return 'İstek - ';
  };

  useEffect(() => {
    if (authorizedUser == null) {
      router.replace(PATHS.login);
    }
  }, [authorizedUser, router]);

  const createModal = useModal();

  return (
    <Layout>
      <Navbar state="active" />
      <div className="main">
        <Container className="pt-10">
          <div className="grid grid-cols-12 gap-8">
            <Sidebar page={page} setPage={setPage} />
            <div className="col-span-9">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  {formatPageName(page)}
                </span>
                {page === Page.requests && (
                  <Button onClick={createModal.open} color="light">
                    Talep oluştur
                  </Button>
                )}
              </div>
              {page === Page.requests && (
                <Requests modalController={createModal} />
              )}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Noter;
