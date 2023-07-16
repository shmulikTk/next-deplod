'use client'

import { useEffect, useState } from "react";

interface PasswordValidationProps {
    password: string;
}



export default function PasswordValidation({password}: PasswordValidationProps) {
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(false);
    const [digits, setDigits] = useState(false);
    const [specialChar, setSpecialChar] = useState(false);
    const [minLength, setMinLength] = useState(false);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
       handlePasswordValidation(password);
    },[password]);

    const handlePasswordValidation= (passwordValue: string) => {
        
            const uppercaseRegExp   = /(?=.*?[A-Z])/;
            const lowercaseRegExp   = /(?=.*?[a-z])/;
            const digitsRegExp      = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp   = /.{8,}/;

            const passwordLength =      passwordValue.length;
            const uppercasePassword =   uppercaseRegExp.test(passwordValue);
            const lowercasePassword =   lowercaseRegExp.test(passwordValue);
            const digitsPassword =      digitsRegExp.test(passwordValue);
            const specialCharPassword = specialCharRegExp.test(passwordValue);
            const minLengthPassword =   minLengthRegExp.test(passwordValue);
            let errMsg ="";
            if(passwordLength===0){
                setEmpty(true);
            } else {
                setEmpty(false);
            }
            if(!uppercasePassword){
                setUppercase(true);
            }else {
                setUppercase(false);
            }
            
            if(!lowercasePassword){
                setLowercase(true);
            }else {
                setLowercase(false);
            }
            
            if(!digitsPassword){
                setDigits(true);
            }else {
                setDigits(false);
            }
            
            
            if(!specialCharPassword){
                setSpecialChar(true);
            }else {
                setSpecialChar(false);
            }
            
            
            if(!minLengthPassword){
                setMinLength(true);
            }else{
                setMinLength(false);
            }
            
    }

    

  return (
    <div>
        <div>
            <div className={`${!minLength ? 'text-blue-500' : 'text-red-800'}`}>At least 8 characters</div>
        </div>
        <div>
            <div className={`${!digits ? 'text-blue-500' : 'text-red-800'}`}>1 number</div>
        </div>
        <div>
            <div className={`${!uppercase ? 'text-blue-500' : 'text-red-800'}`}>1 uppercase letter</div>
        </div>
        <div>
            <div className={`${!lowercase ? 'text-blue-500' : 'text-red-800'}`}>1 lowercase letter</div>
        </div>
        <div>
            <div className={`${!specialChar ? 'text-blue-500' : 'text-red-800'}`}>1 special character</div>
        </div>
    </div>
  )
}



