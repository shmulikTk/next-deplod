import { ReactNode } from "react";
import { sizeType } from "../ui.types";

interface BoxProps {
    size?: sizeType;
    children?: ReactNode | ReactNode[];
    className?: string | undefined;
}

export default function Box({ children, size="normal", className }: BoxProps) {

    const BoxSizes = {
        large: 'w-16 h-16 rounded-2xl',
        normal: 'w-12 h-12 rounded-xl',
        small: 'w-8 h-8 rounded-lg',
        tiny: 'w-6 h-6 rounded-md',
    }

  return (
    <div className={`flex items-center bg-primary text-white justify-center ${BoxSizes[size]} ${className} `}>
       {children}
    </div>
  )
}
