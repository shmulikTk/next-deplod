// import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { ReactNode, useRef } from "react";

interface ModalProps {
    children: ReactNode | ReactNode[];
    isOpen?: boolean;
    onClose?(): void;
    className?: string | undefined;
};


export default function Modal({ children, isOpen, className, onClose  }: ModalProps) {

    const ref = useRef(null);
    //     useOnClickOutside(ref, () => {
    //         if (onClose) {
    //             onClose();
    //         }
    // }
    // );

  return (
    <label className={`modal modal-bottom sm:modal-middle modal-open ${className}`}>
        <label className="modal-box" ref={ref}>
            {children}
        </label>
    </label>
  )
}
