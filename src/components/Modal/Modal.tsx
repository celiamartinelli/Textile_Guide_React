import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkPruneBG p-6 rounded-lg shadow-lg">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-pink text-white py-2 px-4 rounded-md"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
