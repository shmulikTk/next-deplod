'use client'
import { Breadcrumb } from "../breadcrumb/Breadcrumb";
import Dropdown from "../dropdown/Dropdown";
import { MdAccountCircle, MdAdd } from "react-icons/md";
import Search from "../search/Search";
import Button from "../buttons/button/Button";
import { usePathname } from 'next/navigation';
// import { signOut } from "@/api/auth";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Auth } from "aws-amplify";
import { signOut } from "@/api/auth";

const initiatePasswordReset = async (email: string) => {
    try {  
      const init = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN_URL}/users/password/reset/init`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',

                  },
                  body: JSON.stringify({ email }),
          });
      return init;
    } catch(err) {
      console.log('resetPassword', {err});
    }
  }

export default function Header() {
    const pathname = usePathname();
    const isUsersPath = pathname.split('/')[1] === 'users';
    const router = useRouter()

    const handleSignOut = () => {
        signOut();
        router.push('/login');
    }

    const handleResetPassword = async () => {
        try {
            const data = await initiatePasswordReset('shmulik1102@gmail.com');
            return data?.json();
        } catch (err) {
            console.log({err});
        }
    }

  return (
    <div className="navbar w-full h-4 justify-between p-5 bg-white mb-4">
        <div className="flex flex-col">
            <Breadcrumb />
        </div>
        <div className="flex-none gap-2">

            <Link href="/invite" className="button">invite</Link>
            {/* <Button onClick={handleResetPassword} className="button">reset password</Button> */}
            <Search />
            <Dropdown 
                label={<div>
                        <MdAccountCircle color="black" />
                    </div>}
                className="dropdown-end"
                items={[
                    {id: 0, content: <div onClick={() => handleSignOut()} className="text-black">sign out</div>}
                ]}
            />
        </div>
    </div>
  )
}
