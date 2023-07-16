import { sizeType } from "@/components/ui.types";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
    children: ReactNode | ReactNode[];
    size?: sizeType;
    block?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string | undefined;
    icon?: JSX.Element[] | JSX.Element;
}

export default function Button({ children, icon, size='normal', block, onClick, disabled, className }: ButtonProps) {

    const ButtonSizes = {
        tiny: 'btn-xs',
        small: 'btn-sm',
        normal: 'btn-md',
        large: 'btn-lg',
    }

  return (
    <button onClick={onClick} disabled={disabled} className={`btn ${ButtonSizes[size]} ${block && 'btn-block'} ${className}`}>
        {icon}
        {children}
    </button>
  )
}
