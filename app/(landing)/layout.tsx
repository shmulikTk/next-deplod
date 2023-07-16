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
import Menu from '@/components/menu/Menu';
import Header from '@/components/header/Header';


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

export default function RootLayout({
  children,
  modals
}: {
  children: React.ReactNode
  modals: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPath = pathname.split('/')[1] !== 'login';
  const isChangePasswordPath = pathname.split('/')[1] !== 'changePassword';

  useEffect(() => {
    const checkAuthState = async () => {      
      try {
        const auth = await Auth.currentAuthenticatedUser();
        // console.log(process.env.NEXT_PUBLIC_API_DOMAIN_URL);
        // console.log({ auth });
      } catch (err) {
        console.log(err);
        if (isChangePasswordPath && isLoginPath ) {
          // router.push('/login');
        }
      }
    };
    checkAuthState();
  }, [isChangePasswordPath, router]);

  useEffect(() => {
    const href = window.location.href;
    const {action} = parseChangePasswordParams(href);
    console.log('AuthLayout',{pathname},{ action }, { href });
    if (action === 'changePassword') {
      // router.push('/changePassword');
    }
    // if (typeof window !== 'undefined') {
    //   const href = window.location.href;
    //   const {action} = parseChangePasswordParams(href);
    //   console.log({ action });
    //   if (action === 'changePassword') {
    //     router.push('/changePassword');
    //   }
    // }
  
  }, [router]);

  console.log('RootLayout', {pathname});
  

  return (
    <html lang="en" data-theme="light">
      <body suppressHydrationWarning={true}>
        <JotaiProvider>
          <div className='flex flex-row h-screen'>
            {isLoginPath && isChangePasswordPath && <Menu /> }
            <div className='flex-1 flex flex-col pb-8'>
              {isLoginPath && isChangePasswordPath && <Header /> }
              <div className={`${inter.className} flex-1`}>{children}</div>
              <div>{modals}</div>
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
