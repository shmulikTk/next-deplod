import { ReactNode } from "react";
import { sizeType } from "../ui.types";
import { MdOutlineClose } from "react-icons/md";


interface ChipProps {
    children?: ReactNode | ReactNode[];
    className?: string | undefined;
    size?: sizeType;
    color?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
    onClose?(): void; 
}

export default function Chip({ size="normal", children, className, color='neutral', onClose }: ChipProps) {

    const ChipSizes = {
        large: 'badge-lg',
        normal: 'badge-ms',
        small: 'badge-sm',
        tiny: 'badge-xs',
    }

    const handleClose = () => {
        if(onClose){
            onClose();
        }
    }

  return (
    <div className={`badge ${ChipSizes[size]} badge-${color} ${className}`}>
        {children}
        <div className="flex flex-row">
            <div className="divider divider-horizontal mr-1  w-0 before:bg-black after:bg-black before:w-[0.3px] after:w-[0.3px]" />
            <MdOutlineClose onClick={handleClose} className="cursor-pointer"/>
        </div>
    </div>
  )
}
