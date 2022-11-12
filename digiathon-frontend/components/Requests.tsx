import { ModalController } from '@ethylene/ui-hooks/useModal';
import { useState } from 'react';
import { Button, Input, Modal } from 'ui';

export const Requests = ({
  modalController,
}: {
  modalController: ModalController;
}) => {
  const [request, setRequests] = useState([]);

  const createSignRequest = () => {};

  return (
    <div>
      <Modal
        closeOnClickOutside={false}
        width="540px"
        modalController={modalController}
      >
        <div className="flex flex-col w-full">
          <p className="text-xl font-semibold mb-4">Talep oluştur</p>
          <Input placeholder="Talep ismi" />
          <Button color="primary" className="mt-4">
            Oluştur
          </Button>
        </div>
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
