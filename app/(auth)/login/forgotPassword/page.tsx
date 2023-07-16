"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input/Input";
import Button from "@/components/buttons/button/Button";
import Alert from "@/components/alert/Alert";

interface ForgotPasswordProps {

}

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

export default function ForgotPassword({  }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
        const data = await initiatePasswordReset(email);
        console.log({ data });
        if (data?.ok) {
          setError('Check you email');
          setOpenAlert(true);
        }
    } catch (err) {
        setError('Something went wrong');
        setOpenAlert(true);
    }
  }

  const handleEmailValidation = (evnt: any) => {
    const emailInputValue = evnt.target.value.trim();
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validEmail = emailRegExp.test(emailInputValue);

    let errMsg ="";
    if (!validEmail) {
      errMsg = 'Invalid email address';
    }

    setEmailErr(errMsg);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-[450px] h-[450px] shadow-lg bg-white flex justify-center items-center rounded-2xl">
            <div className="w-[312px] flex flex-col items-center">
                <div>Forgot Password</div>
                <div className="self-start mt-8 mb-8">Enter your registered email address.<br /> An email notification with a password reset will sent to you.</div>
                <Input 
                    placeholder="email"
                    type="email" 
                    onChange={setEmail}
                    name="email"
                    onKeyUp={handleEmailValidation}
                    required
                    />
                <div>{emailErr}</div>
                <Button onClick={handleSubmit} className={'w-full mt-2'}>Continue</Button>
                <div className="flex items-center justify-center w-[450px] mt-6">
                    <Alert isOpen={openAlert} onClose={() => setOpenAlert(false)} color="error">{error}</Alert>
                </div>
            </div>
        </div>    
    </div>
  )
}
