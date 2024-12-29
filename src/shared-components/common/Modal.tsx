'use client';

import { createPortal } from 'react-dom';
import { mergeClassNameProps } from '@/utils/ui/componentUtils';
import { CommonStyles } from '@/types';

interface ModalProps {
  toggleModal: () => void;
  children: React.ReactNode;
  modalHeader: React.ReactNode | string;
  modalFooter: React.ReactNode;
};

/**
 * A modal window that blocks the rest of the UI
 * @param props Modal props
 * @param props.toggleModal Function to toggle the modal's display
 * @param props.children React children to display in the modal
 * @param props.modalHeader React node or string to display in the modal header
 * @param props.modalFooter React node to display in the modal footer
 * @returns React Element
 */
const Modal = ({ toggleModal, children, modalHeader, modalFooter }: ModalProps) => {
  const getModalHeader = (header: React.ReactNode | string): React.ReactNode => {
    if (typeof header !== 'string') {
      return header;
    }

    return <h3 className="m-0">{header}</h3>;
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalBody"
    >
      <div className={mergeClassNameProps(CommonStyles.PANE_BG_COLOR, 'p-4 rounded-lg space-y-4')}>
        <div id="modalTitle" className="flex">
          {getModalHeader(modalHeader)}
          <button className="ml-auto" title="Close Modal" onClick={toggleModal}>
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
