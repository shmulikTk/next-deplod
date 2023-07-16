"use client"
import { useState } from "react"
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import MenuItem from "../item/MenuItem";
import Box from "@/components/box/Box";
import { usePathname } from 'next/navigation';

interface CollapseProps {
    item: any;
    isMenuClose: boolean;
}

export default function Collapse({item, isMenuClose}: CollapseProps) {
  const [openItem, setOpenItem] = useState(true);
  const pathname = usePathname();

  const handleOpenMenu = () => {
    setOpenItem(prev => !prev)
  }

  const activePath = `/${pathname.split('/')[1]}`;
  const isActive = item.route === activePath;
  const activeBoxColor = 'bg-gradient-to-r from-[#ff0080] to-[#7928ca]';
  const Icon = item.icon;

  return (
    <>
        <li className={`text-sm flex items-center justify-between cursor-pointer py-3 px-2'}`}>
            <div className="flex items-center gap-2">
                <Box size="small" className={`${isActive ? activeBoxColor : 'bg-[#e9ecef]'} drop-shadow-lg`}>
                    <Icon size='15px' color={`${isActive ? 'white' : 'black'}`} />
                </Box>
                <div className={`${!isMenuClose && 'hidden'} origin-left duration-200 text-[#344767]`}>{item.name}</div>
            </div>
            { item.collapse && (
                <div className={`${!isMenuClose && 'hidden'} ${!openItem && "rotate-180"} duration-300`}>
                    <VscChevronDown onClick={() => handleOpenMenu()} size='20px' color={`${openItem ? "#344767" : '#000000'}`} />
                </div>
            )}
        </li>

        {item.collapse && (
            <div className={`box-border text-[#a0aec8] pl-0 ml-0 ${openItem && "hidden"} transition-transform`}>
                <ul className="list-disc">
                    {item.collapse.map((subItem: any) => (
                        <div key={subItem.key} className=" w-full pl-0  pb-1 text-[rgba(58,65,111,.5)]">
                            <MenuItem item={subItem} isMenuClose={isMenuClose} />
                        </div>
                    ))}
                </ul>
            </div>
        )}
    </>
  )
}
