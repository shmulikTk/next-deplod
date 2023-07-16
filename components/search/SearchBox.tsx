import { MdSearch } from "react-icons/md";
import Input from "../input/Input";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Dropdown from "../dropdown/Dropdown";

interface SearchBoxProps {
    searchInput: string;
    onTextChange: any;
    searchResults: string[];
}

export default function SearchBox({  }: SearchBoxProps) {

    

  return (
    <div>
        <Dropdown label={undefined} items={[]} />
    </div>
  )
}
