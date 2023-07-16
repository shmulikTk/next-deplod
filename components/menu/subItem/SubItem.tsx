"use client"
import { useEffect, useState } from "react"
import IconBtn from "../../buttons/icon/IconBtn";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubItemProps {
    item: any;
    isMenuClose: boolean;
    setIsInPage: any;
}

export default function SubItem({item, isMenuClose, setIsInPage}: SubItemProps) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.route);

  useEffect(() => {
    setIsInPage(pathname === item.route);
    if (pathname === item.route) {
        setActive(true);
    } else {
        setActive(false);
    }
  }, [pathname]);
  
  return (
    <div key={item.key} className={`text-[.875rem] ${!isMenuClose && 'hidden'} duration-500 ${active ? 'font-bold' : 'font-light'}`}>
        <Link href={item.route}>
            {item.name}
        </Link>
    </div>
  )
}
