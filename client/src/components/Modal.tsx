import { useRef, useEffect, createContext, useContext, ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface ModalContextProps {
  onClose: () => void;
}

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

interface ModalHeaderProps {
  title: string;
}

interface ModalBodyProps {
  children: ReactNode;
}

interface ModalFooterProps {
  children: ReactNode;
}

function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function Modal({ children, isOpen, onClose }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClose);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={ref}
        className="bg-indigo-300 rounded-lg shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <ModalContext.Provider value={{ onClose }}>
          {children}
        </ModalContext.Provider>
      </div>
    </div>,
    document.body
  );
}

export function ModalHeader({ title }: ModalHeaderProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalHeader must be used within a Modal");

  return (
    <div className="flex justify-around items-center mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <Button onClick={context.onClose} addNewContent="w-20">
        Close
      </Button>
    </div>
  );
}

export function ModalBody({ children }: ModalBodyProps) {
  return <div>{children}</div>;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return <div>{children}</div>;
}
