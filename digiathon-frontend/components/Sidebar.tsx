import { clsnm } from '@ethylene/utils';
import { useAuthorizedUser, usePage, useSetPage } from 'store/AuthHooks';
import { Page } from 'types/app';
import AppLogo from 'assets/app-logo-lg.png';

export const Sidebar = () => {
  const page = usePage();
  const setPage = useSetPage();

  const isPageActive = (_page: Page) => page === _page;
  const authorizedUser = useAuthorizedUser();

  return (
    <div className="col-span-3 bg-neutral-100 rounded-md p-2 min-h-maximum">
      <span className="mb-2 flex justify-center">
        <img src={AppLogo.src} className="w-32" alt="AppLogo" />
      </span>

      <div
        onClick={() => setPage(Page.requests)}
        className={clsnm(
          'py-2 px-4 flex w-full cursor-pointer hover:bg-neutral-200 rounded-md',
          isPageActive(Page.requests) && 'bg-neutral-200',
        )}
      >
        Taleplerim
      </div>
      {authorizedUser?.type === 'signer' && (
        <div
          onClick={() => setPage(Page.approvals)}
          className={clsnm(
            'py-2 px-4 flex w-full cursor-pointer hover:bg-neutral-200 rounded-md mt-2',
            isPageActive(Page.approvals) && 'bg-neutral-200',
          )}
        >
          Imza isteklerim
        </div>
      )}
    </div>
  );
};
