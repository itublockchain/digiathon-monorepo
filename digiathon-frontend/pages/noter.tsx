import { Container, Layout } from '@ethylene/components';
import { useModal } from '@ethylene/ui-hooks';
import { Navbar } from 'components';
import { Requests } from 'components/Requests';
import { Sidebar } from 'components/Sidebar';
import { PATHS } from 'const/paths';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthorizedUser, usePage } from 'store/AuthHooks';
import { Button } from 'ui';

enum Page {
  requests = 'Talepler',
  approvals = 'Approvials',
}

const Noter = () => {
  const page = usePage();
  const authorizedUser = useAuthorizedUser();
  const router = useRouter();

  const formatPageName = (page: Page) => {
    switch (page) {
      case Page.approvals:
        return 'Bana atanan imza istekleri';
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

  const createModal = useModal();

  return (
    <Layout>
      <Navbar state="active" />
      <div className="main">
        <Container className="pt-10">
          <div className="grid grid-cols-12 gap-8">
            <Sidebar />
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
