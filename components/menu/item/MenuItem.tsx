"use client"
import { useState } from "react"
import { VscChevronDown } from "react-icons/vsc";
import SubItem from "../subItem/SubItem";

interface MenuItemProps {
    item: any;
    isMenuClose: boolean;
}

export default function MenuItem({item, isMenuClose}: MenuItemProps) {
  const [openItem, setOpenItem] = useState(true);
  const [openSubItem, setOpenSubItem] = useState(true);
  const [isInPage, setIsInPage] = useState(false);

  const handleOpenMenu = () => {
    setOpenItem(prev => !prev)
  }

  const handleOpenSubMenu = () => {
    setOpenSubItem(prev => !prev)
  }

  const activeBoxColor = 'bg-gradient-to-r from-[#ff0080] to-[#7928ca]'

  return (
    <>
        {item.type === 'sub-menu' && (
            <>
                <div className={`flex items-center box-border justify-between p-2 text-[#a0aec8] pl-[10px] ml-5 ${!openItem && "hidden"} transition-transform`}>
                    <ul className="list-disc">
                            <li className={`w-full pl-3 pr-3 pb-1 text-[rgba(58,65,111,.5)] ${isInPage && 'marker:text-2xl ml-[3px] text-black'}`}>
                                <SubItem item={item} isMenuClose={isMenuClose} setIsInPage={setIsInPage} />
                            </li>
                    </ul>
                    { item.collapse && (
                            <div className={`${!isMenuClose && 'hidden'} ${!openSubItem && "rotate-180"} duration-300`}>
                                <VscChevronDown onClick={() => handleOpenSubMenu()} size='20px' color={`${openSubItem ? "#344767" : '#000000'}`} />
                            </div>
                    )}
                </div>
                {item.collapse && (
                    <div className={`box-border text-[#a0aec8] pl-4 ml-5 ${!openSubItem && "hidden"} transition-transform`}>
                        <ul className="list-disc">
                            {item.collapse.map((subItem: any) => (
                                <li key={subItem.key} className="w-full pl-3 pr-3 pb-1 text-[rgba(58,65,111,.5)] list-none">
                                    <SubItem item={subItem} isMenuClose={isMenuClose} setIsInPage={setIsInPage} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                )}
            </>
        )}
    </>
  )
}
