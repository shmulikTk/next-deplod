import { ReactNode } from "react";
import { sizeType } from "../ui.types";

interface BadgeProps {
    children?: ReactNode | ReactNode[];
    className?: string | undefined;
    size?: sizeType;
    color?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
}

export default function Badge({ size="normal", children, className, color='neutral' }: BadgeProps) {

    const BadgeSizes = {
        large: 'badge-lg',
        normal: 'badge-ms',
        small: 'badge-sm',
        tiny: 'badge-xs',
    }

  return (
    <div className={`badge ${BadgeSizes[size]} badge-${color} ${className}`}>
        {children}
    </div>
  )
}
