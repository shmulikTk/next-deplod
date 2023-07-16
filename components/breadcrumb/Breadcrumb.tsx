"use client"
import React from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi'
                  
export function Breadcrumb() {
  const pathname = usePathname();
  let currentLink = '';
  const crumbs = pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, i, crumbs) => {
      currentLink = `${currentLink}/${crumb}`

      if (i + 1 === crumbs.length) {
        return <li key={i}>{crumb}</li>
      }

      return (
        <li key={i}>
          <Link href={currentLink}>
            {crumb}
          </Link>
        </li>
      )
    });

    return (
    <div className="text-sm breadcrumbs text-[#344767]">
      <ul>
        {crumbs.length === 0 ? <li>dashboard</li> : <li><Link href={"/"}><BiHomeAlt className="cursor-pointer" /></Link></li>}
        {crumbs}
      </ul>
    </div>
    );
}
