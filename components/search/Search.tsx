import { MdSearch } from "react-icons/md";
import Input from "../input/Input";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Dropdown from "../dropdown/Dropdown";

interface SearchProps {
    className?: string | undefined;
    searchResults?: string[];
    onChange?: ChangeEventHandler;
}

export default function Search({ className, onChange }: SearchProps) {

    const [text, setText] = useState('');
    const [openSearchBox, setOpenSearchBox] = useState(false);

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target?.value);
        setOpenSearchBox(true)
        if (onChange) {
        onChange(event);
        }
    };

  return (
    <div className={`${className}`}>
       <Input icon={<MdSearch color="black" />} inputSize="small" placeholder={"type here..."} onChange={onTextChange} value={text} className={'text-black'} />
       {/* TODO: should work on that */}
       {/* {openSearchBox && (
            <Dropdown label={undefined} items={[]} />
        )} */}
    </div>
  )
}
