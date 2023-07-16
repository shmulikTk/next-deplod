import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { MdDone, MdErrorOutline } from "react-icons/md";
import { sizeType } from "../ui.types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
    icon?: JSX.Element[] | JSX.Element;
    placeholder: string;
    inputSize?: sizeType;
    status?: 'success' | 'error';
    type?: HTMLInputTypeAttribute;
    value?: string | number | readonly string[] | undefined;
    onChange: (value: any) => void;
    className?: string | undefined;
}

export default function Input ({ icon, placeholder, inputSize='normal', status, className, type='text', onChange, ...props }: InputProps) {
    const sizes = {
        large: 'input-lg',
        normal: 'input-md',
        small: 'input-sm',
        tiny: 'input-xs',
    };

    const inputStatus = {
        success: 'input-success',
        error: 'input-error',
    }

  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <div className="form-control w-full max-w-xs">
        <label className="label relative block">
            {icon && 
                <div className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3 flex items-center">
                    {icon}
                </div>
            }            
            <input 
                type={type} 
                placeholder={placeholder} 
                onChange={handleChange}
                className={`input input-bordered ${sizes[inputSize]} w-full max-w-xs text-black ${icon && 'block pl-7'} ${status && inputStatus[status]} ${className}`} 
                {...props} 
            />
            {status && 
                <div className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-0 flex items-center">
                    {status === 'success' && <MdDone color={'green'} /> }
                    {status === 'error' && <MdErrorOutline color={'red'} /> }
                </div>
            }
        </label>
    </div>
  )
}
