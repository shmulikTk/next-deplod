interface SelectProps {
    value: string | number | readonly string[] | undefined;
    onChange(item: any): void;
    options: (string | number)[];
    disabledOption: string;
};

export default function Select({ value, onChange, options, disabledOption }: SelectProps) {
  return (
    <select 
            className="select select-bordered select-sm w-full" 
            value={value}
            onChange={e => {
              onChange(e.target.value);
            }}
            >
          <option disabled>{disabledOption}</option>

          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
    </select>
  )
}
