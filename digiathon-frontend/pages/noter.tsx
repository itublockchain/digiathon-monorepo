import { Container, Layout } from '@ethylene/components';
import { clsnm } from '@ethylene/utils';
import { Navbar } from 'components';
import { useState } from 'react';
import { Button } from 'ui';

enum Page {
  requests = 'Talepler',
  approvals = 'Approvials',
}

const Noter = () => {
  const [page, setPage] = useState<Page>(Page.requests);

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

  return (
    <Layout>
      <Navbar state="active" />
      <div className="main">
        <Container className="pt-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 bg-neutral-100 rounded-md p-2">
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

              <div
                onClick={() => setPage(Page.approvals)}
                className={clsnm(
                  'py-2 px-1 flex w-full cursor-pointer hover:bg-neutral-200 rounded-md mt-2',
                  isPageActive(Page.approvals) && 'bg-neutral-200',
                )}
              >
                Onaylarım
              </div>
            </div>
            <div className="col-span-9">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  {formatPageName(page)}
                </span>
                <Button color="light">Talep oluştur</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Noter;
