'use client'
import '../globals.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import {Amplify, Auth} from "aws-amplify";
import { default as devAwsConfig } from "../../aws-exports-dev";
import { default as stagingAwsConfig } from "../../aws-exports-staging";
import { default as prodAwsConfig } from "../../aws-exports-prod";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Provider as JotaiProvider } from 'jotai';
import Header from '@/components/header/Header';
import Image from "next/image";
import Logo from "../../public/a-loveLogo.svg";


applyAmplifyConfig();

export function splitFirstOccurrence(str: string, separator: string) {
  const [first, ...rest] = str.split(separator);
  const remainder = rest.join('-');
  return [first, remainder];
}

export function parseChangePasswordParams(path: string) {
    const [, params ] = splitFirstOccurrence(path, '?');
    // const [codeParam, username ] = splitFirstOccurrence(params, '&username=');
    const [, action ] = splitFirstOccurrence(params, '=');
    return { action }
}


const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isChangePasswordPath = pathname.split('/')[1] !== 'changePassword';

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const auth = await Auth.currentAuthenticatedUser();
        // console.log(process.env.NEXT_PUBLIC_API_DOMAIN_URL);
        // console.log({ auth });
      } catch (err) {
        console.log(err);
        if (isChangePasswordPath) {
          // router.push('/login');
        }
      }
    };
    checkAuthState();
  }, [isChangePasswordPath, router]);

  // useEffect(() => {
  //   const href = window.location.href;
  //   const {action} = parseChangePasswordParams(href);
  //   console.log('AuthLayout',{pathname},{ action });
  //   if (action === 'changePassword') {
  //     router.push('/changePassword');
  //   }
  //   // if (typeof window !== 'undefined') {
  //   //   const href = window.location.href;
  //   //   const {action} = parseChangePasswordParams(href);
  //   //   console.log({ action });
  //   //   if (action === 'changePassword') {
  //   //     router.push('/changePassword');
  //   //   }
  //   // }
  
  // }, [router]);

  return (
    <html lang="en" data-theme="light">
      <body suppressHydrationWarning={true}>
        <JotaiProvider>
          <div className='flex flex-row'>
            <div className='flex-1 flex flex-col'>
              <div className={`${inter.className} flex-1`}>
                <div className='flex flex-col items-center py-8 w-full h-screen bg-gradient-to-r from-[#112d3e] to-[#080745] overflow-hidden relative'>
                  <div className=''>
                    <Image src={Logo} alt={""}/>
                  </div>
                  <div className='w-[555px] h-[555px] bg-[rgba(0,72,206,0.2)] rounded-full absolute top-[-145px] left-[-176px] blur-2xl' />
                  <div className='w-[555px] h-[555px] bg-[#f0545423] rounded-full absolute top-[150px] right-[-145px] blur-2xl' />
                  <div className='w-[555px] h-[555px] bg-[#0048ce33] rounded-full absolute top-[613px] right-[-125px] blur-2xl' />
                  <div className='w-[1267.99px] h-[654.17px] bg-[#4b09a033] rounded-full absolute top-[600px] left-[-417px] rotate-[29.78deg] blur-2xl' />
                  {children}
                  <div className='flex flex-col items-center text-[18px] text-[#e4e4e4] font-normal leading-8 tracking-wide'>
                    <div>Delivered by AlgoAI Tech</div> 
                    <div>2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </JotaiProvider>
      </body>
    </html>
  )
}



function applyAmplifyConfig() {
  let config;
  if (process.env.NEXT_PUBLIC_APP_ENV === "dev")
    config = devAwsConfig;
  else if (process.env.NEXT_PUBLIC_APP_ENV === "staging")
    config = stagingAwsConfig;
  else if (process.env.NEXT_PUBLIC_APP_ENV === "prod")
    config = stagingAwsConfig;
  else
    console.error(`process.env.NEXT_PUBLIC_APP_ENV MUST BE dev or staging or prod, but it is instead : ${process.env.NEXT_PUBLIC_APP_ENV}`);

  console.log(process.env.NEXT_PUBLIC_APP_ENV)
  console.log(JSON.stringify(config, null, 2))

  Amplify.configure(config);
}
