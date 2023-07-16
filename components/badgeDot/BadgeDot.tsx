import { ReactNode } from "react";
import { sizeType } from "../ui.types";

interface BadgeDotProps {
    className?: string | undefined;
    size?: sizeType;
    color?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
}

export default function BadgeDot({ size="normal", className, color='neutral' }: BadgeDotProps) {

    const BadgeDotSizes = {
        large: 'badge-lg',
        normal: 'badge-ms',
        small: 'badge-sm',
        tiny: 'badge-xs',
    }

  return (
    <div className={`badge ${BadgeDotSizes[size]} badge-${color} ${className}`} />
  )
}
