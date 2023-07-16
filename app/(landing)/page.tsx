'use client'
import { usePathname } from 'next/navigation';


export default function Home() {

  const pathname = usePathname();
  console.log('Home',{pathname});
  


  return (
    <main>
      home
    </main>
  )
}
