import { ReactNode } from "react";

interface TooltipProps {
    text: string | number | readonly string[] | undefined;
    children: ReactNode | ReactNode[];
    direction?: 'top' | 'bottom' | 'left' | 'right';
    color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
};


export default function Tooltip({ text, children, direction='top', color  }: TooltipProps) {

    const tooltipDirection = {
        top: 'tooltip-top',
        bottom: 'tooltip-bottom',
        left: 'tooltip-left',
        right: 'tooltip-right',
    }

    const tooltipColor = {
        primary: 'tooltip-primary',
        secondary: 'tooltip-secondary',
        accent: 'tooltip-accent',
        info: 'tooltip-info',
        success: 'tooltip-success',
        warning: 'tooltip-warning',
        error: 'tooltip-error',
    }

  return (
    <div className={`tooltip ${tooltipDirection[direction]} ${color && tooltipColor[color]}`} data-tip={text}>
        {children}
    </div>
  )
}
