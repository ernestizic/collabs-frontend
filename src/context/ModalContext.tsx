'use client';

import { createContext, useContext, useState } from 'react';

export type ModalProps = Record<string, unknown>;

type ModalContextType = {
  openModal: (id: string, props?: ModalProps) => void;
  closeModal: () => void;
  modalId: string | null;
  modalProps: ModalProps;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalId, setModalId] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<ModalProps>({});

  const openModal = (id: string, props: ModalProps = {}) => {
    setModalId(id);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalId(null);
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalId, modalProps }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModalContext must be used inside ModalContextProvider');
  return context;
};
