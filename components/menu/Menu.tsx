"use client"
import { useState } from "react"
import { VscChevronLeft } from "react-icons/vsc";
import Link from 'next/link';
import Collapse from "./collapse/Collapse";
import routes from "./routes";


export default function Menu() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`bg-white ${open ? "w-60" : " w-24"} duration-300 h-full relative p-5 pb-8`}>
        {/* drawer */}
        <div 
          onClick={() => setOpen(prev => !prev)} 
          className={` bg-white rounded-full grid place-items-center absolute cursor-pointer top-9 w-7 h-7 ${!open && "rotate-180"} -right-3`}>
          <VscChevronLeft color="#344767" size={'20px'}/>
        </div>

        
        {/* Brand */}
        <div className="flex gap-x-4 items-center pl-2">
          {/* <div className="w-12 h-12 p-4 rounded-lg border-2 shadow-md">img</div> */}
          <div className={`origin-left font-medium text-xl duration-300 ${!open && 'scale-0'} text-[#344767] cursor-pointer`}>
            <Link href={"/"}>
              a-love
            </Link>
          </div>
        </div>

        <div className=" my-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-[#344767] to-transparent opacity-25"></div> 
       
        {/* menus */}
        <ul className="pt-4 mt-9">
          {routes.map(menu => (
            <div key={menu.key}>
              {menu.type === 'menu' && (
                <Collapse item={menu} isMenuClose={open} />
              )}
            </div>
          ))}
        </ul>

    </div>
  )
}
