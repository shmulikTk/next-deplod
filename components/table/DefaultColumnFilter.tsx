import Input from "../input/Input";

interface DefaultColumnFilterProps {
    columnName: any;
    setFilter: any;
}

export function DefaultColumnFilter({ columnName, setFilter }: DefaultColumnFilterProps) {
  
  return (
    <Input 
      onChange={(e) => setFilter(columnName ,e.target.value) }
      placeholder={`value`}
    />
  )
}
