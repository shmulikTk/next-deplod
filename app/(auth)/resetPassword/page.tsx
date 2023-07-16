"use client"
import { useState } from "react";
import Input from "@/components/input/Input";
import Button from "@/components/buttons/button/Button";
import Alert from "@/components/alert/Alert";
import { parseChangePasswordParams } from "./utils";
import PasswordValidation from "../components/passwordValidation/PasswordValidation";

  const confirmPasswordReset = async (username: string, verificationCode: string, newPassword: string) => {
    try {  
      const user = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN_URL}/users/password/reset/confirm`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',

                  },
                  body: JSON.stringify({ username, newPassword, verificationCode  }),
          });
      return user;
    } catch(err) {
      console.log('resetPassword', {err});
    }
  }

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
 
  const handleSubmit = async () => {
    if ((password.length >= 8 && confirmPassword.length >= 8) && password === confirmPassword) {
        // send api req for change password
        if (typeof window !== 'undefined') {
          const {code, username} = parseChangePasswordParams(window.location.href);
          console.log({ code, username });
          
          await confirmPasswordReset(username,code,password);
          // await newUser?.json();
        }
    } else {
        // i will get the actual error message from the api req
        setError('Something went wrong');
        setOpenAlert(true);
    }
  }

  const handleConfirmValidation = (evnt: any) => {
    let confirmError = ''
    if (password !== confirmPassword) {
       confirmError = 'Confirm password is not matched';
    }
    setConfirmPasswordError(confirmError);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-[450px] h-[450px] shadow-lg bg-white flex justify-center items-center rounded-2xl">
            <div className="w-[312px] flex flex-col items-center">
                <div className="mt-8 mb-8">Reset Password</div>
                <Input 
                    placeholder="Password" 
                    type="password"
                    value={password}
                    onChange={setPassword}
                    />
                { password.length > 0 && <PasswordValidation password={password} /> }
                <Input 
                    placeholder="New Password" 
                    type="password" 
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    onKeyUp={handleConfirmValidation}
                    />
                { confirmPassword.length > 0 && <div>{confirmPasswordError}</div> }
                <Button onClick={handleSubmit} className={'w-full mt-2'}>Continue</Button>
            </div>
        </div>  
        <div className="flex items-center justify-center w-[450px] mt-6">
            <Alert isOpen={openAlert} onClose={() => setOpenAlert(false)} color="error">{error}</Alert>
        </div>
    </div>
  )
}
