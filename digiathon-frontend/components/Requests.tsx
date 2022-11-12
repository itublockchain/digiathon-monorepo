import { useModal } from '@ethylene/ui-hooks';
import { useState } from 'react';
import { Modal } from 'ui';

export const Requests = () => {
  const [request, setRequests] = useState([]);
  const createModal = useModal();

  return (
    <div>
      <Modal modalController={createModal}>
        <div>Hello</div>
      </Modal>
      {request.length === 0 ? (
        <div className="mt-2 flex justify-center">
          <span>Talebiniz bulunmamaktadır</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
