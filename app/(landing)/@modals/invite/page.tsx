'use client'

import Button from "@/components/buttons/button/Button";
import Chip from "@/components/chip/Chip";
import Modal from "@/components/modal/Modal"
import Select from "@/components/select/Select"
import { useRef, useState } from "react";
import { MdOutlineAddLink } from "react-icons/md";
import Alert from "@/components/alert/Alert";
import { Auth } from "aws-amplify";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRouter } from "next/navigation";


  const adminCheckEmailExists = async (email: string) => {
    const session = await Auth.currentSession();
    const idToken = session.getIdToken();

    console.log(idToken.getJwtToken());
    

    try {
      const user = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN_URL}/users/email/exists/?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken.getJwtToken()}`
            },
    });
    return user; 
  
    } catch(err) {
      console.log('getUserByEmail', {err});
    }

  }


  const resetPassword = async () => {
    try {  
      const user = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN_URL}/users/password/reset/confirm`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',

                  },
                  body: JSON.stringify({ username: '04563e73-8dd1-4c0a-857d-997c7513ad65', newPassword: 'abcde12345', "verificationCode":"896179" }),
          });
      return user;
    } catch(err) {
      console.log('resetPassword', {err});
    }
  }

  const createUser = async (role: any, account: any, email: string) => {
    const session = await Auth.currentSession();
    const idToken = session.getIdToken();
    
    try {
      // const user = await fetch(`http://localhost:3000/api/user/createUser`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'token': idToken.getJwtToken(),
      //   },
      //   body:  JSON.stringify({ token: idToken.getJwtToken(), role, account, email }),
      // });
      // return user;


      const user = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken.getJwtToken()}`
                },
                body: JSON.stringify({ email, groups: [{"accountId":account, "role":{"name":role}}] }),
        });
      await user.json()        


    } catch(err) {
      console.log('getUserByEmail', {err});
    }

  }


export default function Page() {

  const [role, setRole] = useState('SUPPORT');
  const [account, setAccount] = useState('alove');
  const [value, setValue] = useState('')
  const [emailChips, setEmailChips] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();

  const handleChange = (evt: any) => {
    setValue(evt.target.value)
  };

  const handleDelete = (toBeRemovedIndex: any) => {
    const chips = emailChips.filter((chip, index) => index !== toBeRemovedIndex);
    setEmailChips(chips)
  };


  const handleInvitation = async () => {
    if (role.length > 0 && account.length > 0 && emailChips.length > 0) {
      const user = await adminCheckEmailExists(emailChips[0]);
      const data = await user?.json()
      if (!data.userExists) {
        // create user api
        await createUser(role, account, emailChips[0]);
      } else {
        // user exist error
        setError('Something went wrong');
        setOpenAlert(true);
      }
    } else {
      setError('Something went wrong');
      setOpenAlert(true);
    }
  };

  const handleCopyLink = () => {
    // TODO: ask yanai how it should be
  };

  const handleKeyDown = (evt: any) => {
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault();
        
      let email = value.trim();
        
      if (email) {
        const chips = [...emailChips, email];
        setEmailChips(chips);
        setValue('');
      }
    }
  };

  const ref = useRef(null);
        useOnClickOutside(ref, () => {
            router.back();
    });

  return (
      <Modal isOpen={true}>
        <div ref={ref} className="flex flex-col justify-center items-center gap-4 py-10 px-20">
          <div className=" self-start">Invite to a-dmin</div>
          <div className="flex flex-row gap-2">
            {emailChips.map((email, index) => <Chip onClose={() => handleDelete(index)} key={index}>{email}</Chip>)}
          </div>
          <textarea 
            className="textarea textarea-bordered textarea-lg w-full max-w-xs" 
            placeholder="Add one or more people…"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Select 
            value={role} 
            onChange={setRole} 
            options={["SUPPORT" , "TRANSLATOR" , "CONTENT_EDITOR", "ADMIN", "OWNER"]} 
            disabledOption={"Role"} />
          <Select 
            value={account} 
            onChange={setAccount} 
            options={["alove", "mujual", "meeplus"]} 
            disabledOption={"Account"} />
          <div className="flex flex-row items-center justify-between w-full">
            <Button onClick={handleCopyLink} icon={<MdOutlineAddLink size="25px" />} size="small">Copy link</Button>
            <Button onClick={handleInvitation} size="small">Send Invitation</Button>
          </div>
          <Alert isOpen={openAlert} onClose={() => setOpenAlert(false)} color="error">{error}</Alert>
        </div>
      </Modal>
  )
}
