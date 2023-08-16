import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: Function;
}
const GlobalPopUp: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 w-full h-full bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center"
      onClick={() => onClose()}
    >
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GlobalPopUp;
