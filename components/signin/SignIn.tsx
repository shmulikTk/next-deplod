"use client"
import { ChangeEvent, useState } from "react";
import Button from "../buttons/button/Button";
import Checkbox from "../checkbox/Checkbox";
import Input from "../input/Input";
// import { signIn } from "@/api/auth";
// import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useRouter } from "next/navigation";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { signIn } from "@/api/auth";
import PasswordValidation from "@/app/(auth)/components/passwordValidation/PasswordValidation";
import Alert from "../alert/Alert";


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMe, setIsRememberMe] = useSessionStorage('isRememberMe', null);
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const [error, setError] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const router = useRouter();

  const handleLogin = () => {

    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validEmail = emailRegExp.test(email);

    if (email && password) {
      const auth = signIn(email, password, isRememberMe);
      auth.then((data) => {
        console.log({ data });
        router.push('/');
      }).catch((err) => {
        setError('Email or Password is incorrect');
        setOpenAlert(true);
      })
    }
  }

  const handleRememberMe = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setIsRememberMe(true);
    } else {
      setIsRememberMe(false);
    }
  }

  const handleForgotPassword = () => {
    router.push('/login/forgotPassword');
  }

  const handleEmailValidation = (evnt: any) => {
    const emailInputValue = evnt.target.value.trim();
    // const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    // const validEmail = emailRegExp.test(emailInputValue);

    if (emailInputValue.length === 0) {
      setEmailErr('Email required');
    } else {
      setEmailErr('');
    }
  }

  const handlePasswordValidation = (evnt: any) => {
    const passwordInputValue = evnt.target.value.trim();

    if (passwordInputValue.length === 0) {
      setPasswordErr('Password is required');
    } else {
      setPasswordErr('');
    }
  }

  return (
    <>
      <div className="w-[664.67px] h-[428px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-[#0f2b3c7f] flex flex-col justify-center items-center rounded-2xl px-[96px] py-[64px]">
        <div className="flex items-center h-full mb-10">
            <div className="font-medium text-3xl leading-10 tracking-[0.5px] text-white">Log In</div>
        </div>
        <div className=" flex flex-col items-center gap-1">
            <input 
              type="email" 
              placeholder="email" 
              name="email"
              className={`input input-bordered focus:text-white	 placeholder:text-[#C1C7CF] focus:bg-opacity-0 input-ghost ${emailErr ? 'border-[#FF0404]' : 'border-[#C1C7CF]'} border-[1px] w-[472px]` }
              onKeyUp={handleEmailValidation}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className=" place-self-start font-normal text-sm text-[#FF0404] mb-1">{emailErr}</div>
            <input 
              type="password" 
              placeholder="password" 
              name="password"
              onKeyUp={handlePasswordValidation}
              required
              className={`input input-bordered focus:text-white placeholder:text-[#C1C7CF] focus:bg-opacity-0 input-ghost ${passwordErr ? 'border-[#FF0404]' : 'border-[#C1C7CF]'} w-[472px]`} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className=" place-self-start font-normal text-sm text-[#FF0404] mb-1">{passwordErr}</div>
            <Button onClick={handleLogin} className={'w-[472px] h-[52px] mt-2 bg-gradient-to-r from-[#E25355] to-[#FD2020] border-0 text-white'}>Log in</Button>
            <div className="flex flex-row justify-between w-full mt-3">
                <div className="flex flex-row gap-1">
                    {/* <Checkbox checked={isRememberMe} onChange={handleRememberMe} /> */}
                    <Checkbox className="border-white" onChange={handleRememberMe} />
                    <div className="text-white">Remember me</div>
                </div>
                <a className={"link text-white"} onClick={handleForgotPassword}>Forgot password?</a>
            </div>
            <div className="flex items-center justify-center w-[450px] mt-6">
                <Alert isOpen={openAlert} onClose={() => setOpenAlert(false)} color="error">{error}</Alert>
            </div>
        </div>
      </div>
    </>
  )
}
