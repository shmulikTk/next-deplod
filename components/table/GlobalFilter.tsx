import { useEffect, useState } from 'react';
import Input from '../input/Input';


interface GlobalFilterProps {
    preGlobalFilteredRows: any;
    globalFilter: any;
    setGlobalFilter: any;
}

export function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  preGlobalFilteredRows,
}: GlobalFilterProps) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  
  useEffect(() => {
  const timeout = setTimeout(() => {
    setGlobalFilter(value);
  }, 500);

  return () => clearTimeout(timeout);
}, [value]);

  return (
    <div>
      Search:{' '}
      <Input 
        inputSize="tiny"
        placeholder={`${count} records...`} 
        value={value || ""} 
        onChange={e => setValue(e.target.value)} 
      />
    </div>
  )
}
