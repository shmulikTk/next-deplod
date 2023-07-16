'use client'

import Avatar from "@/components/avatar/Avatar"
import Button from "@/components/buttons/button/Button";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import TabSelection from "@/components/tabSelection/TabSelection";
import Logs from "@/components/user/logs/Logs";
import Notifications from "@/components/user/notifications/Notifications";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

// import { users } from '../utils';
// import { User } from '../user.types';

type ActiveTab = 'Uploads' | 'Cases' | 'Statistics' | 'Notifications' | 'Logs' ;

interface KeyofActiveTab {
  Uploads: string;
  Cases: string;
  Statistics: string;
  Notifications: string;
  Logs: string;
}

export default function Users() {
  const [users, setUsers] = useSessionStorage('users', null);
  
  const [title, setTitle] = useState('New a-dmin User');
  const [id, setId] = useState('');

  const [account, setAccount] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');


  const [activeTab, setActiveTab] = useState<ActiveTab>('Uploads');

  const handleTabSelection = (tab: any) => {
    setActiveTab(tab.title)
  };

  const ActiveTabComponent = {
    Uploads: <div className="flex items-center justify-center h-full">TBD</div>,
    Cases: <div className="flex items-center justify-center h-full">TBD</div>,
    Statistics: <div className="flex items-center justify-center h-full">TBD</div>,
    Notifications: <Notifications />,
    Logs: <Logs />,
  }

  const handleCreate = async (tab: any) => {
    setUsers([{name: 'first'}, {name: 'second'}, {name: '3ee4r4'}]);
  };

  const handleSaveUser = async (tab: any) => {

    // TODO: need to create api req
    // const res = await fetch('http://localhost:3000/api/email/SaveUser', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // })
  
  };

  const handleRemoveUser = async (tab: any) => {
    setStatus('Removed');
    // TODO: need to create api req
    // const res = await fetch('http://localhost:3000/api/email/removeUser', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // })
  
  };

  const handleDeactivate = async () => {
    setStatus('Deactivated');
    // TODO: need to create api req
    // const res = await fetch('http://localhost:3000/api/email/deactivate', {
    //   method: 'POST',
    //       headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // })
  };
  
  return (
    <div className="mx-4 flex flex-col h-full gap-4">
      <div className="flex flex-row items-center gap-6">
        <div className="relative ">
          <Avatar className="" placeholder={firstName.charAt(0)} />
          {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <MdOutlineFileUpload color="white" />
          </div> */}
        </div>
        <div>
          <div>{title}</div>
          <div>#{id}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-0">
        <div className="grid grid-cols-3 items-center">
          <div className="">Account:</div>
          <div className="col-span-2">
            <Input 
              placeholder="Account" 
              type="text" 
              onChange={setAccount}
              inputSize="small"
              value={account}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          <div className=" whitespace-nowrap ">First name:</div>
          <div className="col-span-2">
            <Input 
              placeholder="Name" 
              type="text" 
              onChange={setFirstName}
              inputSize="small"
              value={firstName}
              />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          <div className=" whitespace-nowrap ">Last name:</div>
          <div className="col-span-2">
            <Input 
              placeholder="Last name" 
              type="text" 
              onChange={setLastName}
              inputSize="small"
              value={lastName}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          <div className=" ">Phone:</div>
          <div className="col-span-2">
            <Input 
              placeholder="Phone" 
              type="text" 
              onChange={setPhone}
              inputSize="small"
              value={phone}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          <div className=" ">Email:</div>
          <div className="col-span-2">
            <Input 
              placeholder="Email" 
              type="text" 
              onChange={setEmail}
              inputSize="small"
              value={email}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          <div className=" ">Password:</div>
          <div className="col-span-2">
            <Input 
              placeholder="Password" 
              type="text" 
              onChange={setPassword}
              inputSize="small"
              value={password}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          <div className=" ">Language:</div>
          <div className="col-span-2">
            <Input 
              placeholder="Language" 
              type="text" 
              onChange={setLanguage}
              inputSize="small"
              value={language}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          <div className=" ">Role:</div>
          <div className="col-span-2">
            <Select 
            value={role} 
            onChange={setRole} 
            options={["Super admin" , "Admin" , "Translator", "Content Editor", "CS"]} 
            disabledOption={"Role"} />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          <div className="">Status:</div>
          <div className="col-span-2">
            <Select 
              value={status} 
              onChange={setStatus} 
              options={["Enable" , "Disabled"]} 
              disabledOption={"Status"} />
          </div>
        </div>
      </div>
      <div className="basis-1/2 flex flex-col items-center">
        <div className="relative w-full flex flex-col items-center">
          <div className=" absolute bottom-0 w-full h-[2px] bg-[#797E87]"></div>
          <TabSelection onChange={handleTabSelection} tabs={[{id: 1, title: 'Cases'},{id: 2, title: 'Notifications'},{id: 3, title: 'Logs'},]} />
        </div>
        <div className="w-full h-full rounded-lg rounded-tl-none px-12">
          {ActiveTabComponent[activeTab as keyof KeyofActiveTab]}
        </div>
      </div>
      <div className="mt-12 flex flex-row gap-2 justify-end">
        <Button>Delete</Button>
        <Button onClick={handleCreate}>Create</Button>
      </div>
    </div>
  )
}



