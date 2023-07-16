"use client"
import { useState } from "react";
import { Auth } from "aws-amplify";
import { parseChangePasswordParams } from "./utils";
import Input from "@/components/input/Input";
import Button from "@/components/buttons/button/Button";
import Alert from "@/components/alert/Alert";
import PasswordValidation from "../components/passwordValidation/PasswordValidation";

  const changeTemporaryPassword = async (username: string, temporaryPassword: string, newPassword: string) => {
    const session = await Auth.currentSession();
    const idToken = session.getIdToken();
    
    try {
      const user = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN_URL}/users/password/change-temp-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken.getJwtToken()}`
                },
                body: JSON.stringify({ username, temporaryPassword, newPassword }),
        });

        return await user.json();
    } catch(err) {
      console.log('changeTemporaryPassword', {err});
    }

  }

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


  const handleSubmit = async () => {
    if ((password.length >= 8 && confirmPassword.length >= 8) && password === confirmPassword) {
        // send api req for change password
        if (typeof window !== 'undefined') {
          const {username, temporaryPassword} = parseChangePasswordParams(window.location.href);
          const newUser = await changeTemporaryPassword(username,temporaryPassword,'abcd1234');
          await newUser?.json();
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
                <div className="mt-8 mb-8">Change Password</div>
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
