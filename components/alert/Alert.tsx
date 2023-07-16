import { ReactNode } from "react";
import { MdOutlineClose } from "react-icons/md";

interface AlertProps {
    children: ReactNode | ReactNode[];
    color?: 'info' | 'success' | 'warning' | 'error' | 'none';
    dismissible?: boolean;
    isOpen?: boolean;
    onClose?(): void;
};


export default function Alert({ children, color = 'none', dismissible = true, isOpen, onClose }: AlertProps) {

    
    const handleCloseAlert = () => {
        if(onClose) {
            onClose();
        }
    }

  return (
    <>
        {isOpen &&
            <div className={`alert shadow-lg ${color !== 'none' && `alert-${color}`}`}>
                <div>
                    {children}
                </div>
                {dismissible &&
                    <div className="flex-none">
                        <MdOutlineClose className="cursor-pointer" onClick={handleCloseAlert} />
                    </div>
                }
            </div>
        }
    </>
  )
}
