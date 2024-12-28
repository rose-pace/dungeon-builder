import React from 'react';
import { createPortal } from 'react-dom';
import { mergeClassNameProps } from '@/utils/ui/componentUtils';
import { CommonStyles } from '@/types';

interface ModalProps {
  showModal: boolean;
  children: React.ReactNode;
  modalHeader: React.ReactNode | string;
  modalFooter: React.ReactNode;
};

const Modal = ({ showModal, children, modalHeader, modalFooter }: ModalProps) => {
  const getModalHeader = (header: React.ReactNode | string): React.ReactNode => {
    if (typeof header !== 'string') {
      return header;
    }

    return <h3 className="text-xl font-bold">{header}</h3>;
  };

  if (!showModal) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalBody"
    >
      <div className={mergeClassNameProps(CommonStyles.PANE_BG_COLOR, 'p-4 rounded-lg')}>
        <div id="modalTitle" className="flex">
          {getModalHeader(modalHeader)}
          <button className="ml-auto" title="Close Modal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div id="modalBody">
          {children}
        </div>
        <div id="modalFooter">
          {modalFooter}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
