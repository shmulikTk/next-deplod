"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input/Input";
import Button from "@/components/buttons/button/Button";
import { Auth } from "aws-amplify";

interface ResetPasswordProps {

}

export default function ResetPassword({  }: ResetPasswordProps) {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    Auth.currentAuthenticatedUser()
    .then((user) => {
      return Auth.changePassword(email, oldPassword, newPassword);
    })
    .then((data) => console.log(data))
    .catch((err) => setError(err));
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-[450px] h-[450px] shadow-lg bg-white flex justify-center items-center rounded-2xl">
            <div className="w-[312px] flex flex-col items-center">
                <div className="self-start mt-8 mb-8">Change your Password</div>
                <Input 
                    placeholder="email"
                    type="email" 
                    onChange={setEmail}
                    name="email"
                    required
                    value={email}
                />
                <Input 
                    placeholder="Old Password" 
                    type="password"
                    value={oldPassword}
                    onChange={setOldPassword}
                />
                <Input 
                    placeholder="New Password" 
                    type="password" 
                    value={newPassword}
                    onChange={setNewPassword}
                />
                <Button onClick={handleSubmit} className={'w-full mt-2'}>Change</Button>
            </div>
            { error && <div>error: {error}</div> }
        </div>  
    </div>
  )
}
