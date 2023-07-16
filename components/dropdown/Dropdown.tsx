'use client';
import { sizeType } from "@/components/ui.types";
import { ReactNode, useState } from "react";

interface DropdownItem {
  id: string | number;
  content: string | ReactNode;
}

interface DropdownProps {
    size?: sizeType;
    label: ReactNode | ReactNode[];
    labelClassName?: string | undefined;
    className?: string | undefined;
    items: DropdownItem[];
    onChange?(item: DropdownItem): void;
    openDirection?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Dropdown({ size='normal', label, labelClassName, items, onChange, className, openDirection }: DropdownProps) {

    const handleClick = (item: DropdownItem) => {
        if (onChange) {
            onChange(item);
        }
    };

    const dropdownDirection = {
        top: 'dropdown-top',
        bottom: 'dropdown-bottom',
        left: 'dropdown-left',
        right: 'dropdown-right',
    }


  return (
    <div className={`dropdown ${className} ${openDirection && dropdownDirection[openDirection]}`}>
        <label tabIndex={0} className={`m-1 cursor-pointer ${labelClassName}`}>
            {label}
        </label>
        {items.length > 0 &&
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {items.map((item) => (
                    <li key={item.id}>
                        {item.content}
                    </li>
                ))}
            </ul>
        }
    </div>
  )
}
