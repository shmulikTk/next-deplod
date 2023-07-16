'use client'
import { sizeType } from "@/components/ui.types";
import { useState } from "react";

type tabObject = { id: number, title: string }

interface TabSelectionProps {
    size?: sizeType;
    tabs: tabObject[];
    onChange?: (tab: tabObject) => void;
    className?: string | undefined;
    activeColor?: string;
}

export default function TabSelection({ size='normal', tabs, onChange, className, activeColor }: TabSelectionProps) {

    const [selected, setSelected] = useState<number>(1);

    const tabSizes = {
        tiny: 'tab-xs',
        small: 'tab-sm',
        normal: 'tab-md',
        large: 'tab-lg',
    }

    const handleSelectTab = (tab: tabObject) => {
      setSelected(tab.id);
      if (onChange) {
        onChange(tab);
      }
    };

  return (
    <div className={`tabs ${className} w-fit`}>
      {tabs.map((tab) => (
        <a key={tab.id} onClick={() => handleSelectTab(tab)} className={`tab tab-bordered ${tabSizes[size]} ${selected === tab.id && 'tab-active'}`}>
          {tab.title}
        </a> 
      ))}
    </div>
  )
}
