import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type ModalData = {
  isOpen: boolean;
  message: string;
  type: 'info' | 'success' | 'error';
}

type ModalContextData = {
  modalData: ModalData;
  openModal: (data: Omit<ModalData, 'isOpen'>) => void;
  closeModal: () => void;
}

type ModalProviderProps = {
  children: ReactNode;
}

const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    message: '',
    type: 'info',
  });

  function openModal(data: Omit<ModalData, 'isOpen'>) {
    setModalData({
      isOpen: true,
      ...data,
    });
  }

  function closeModal() {
    setModalData(oldState => ({...oldState, isOpen: false}));
  }

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  return context;
}
