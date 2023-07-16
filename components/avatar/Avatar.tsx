import { ReactNode } from "react";
import { sizeType } from "../ui.types";
import { MdOutlineClose } from "react-icons/md";


interface AvatarProps {
    img?: ReactNode | ReactNode[];
    placeholder?: string;
    size?: sizeType;
    mask?: 'squircle' | 'rounded' | 'normal';
    onCLick?(): void; 
    className?: string | undefined
}

export default function Avatar({ className, size="normal", img, placeholder, mask='normal', onCLick }: AvatarProps) {

    const avatarMask = {
        squircle: 'mask mask-squircle',
        rounded: 'rounded-xl',
        normal: 'rounded-full',
    }

    const avatarSizes = {
        large: 'w-32',
        normal: 'w-20',
        small: 'w-16',
        tiny: 'w-8',
    }

    const placeholderSizes = {
        large: 'text-3xl',
        normal: 'text-xl',
        small: '',
        tiny: 'text-xs',
    }

    const handleOnClick = () => {
        if(onCLick){
            onCLick();
        }
    }

  return (
    <div className={`avatar ${!img && 'placeholder'} ${onCLick && 'cursor-pointer'} ${className}`} onClick={handleOnClick}>
        <div className={`${avatarMask[mask]} ${avatarSizes[size]} ${!img && 'bg-neutral-focus text-neutral-content'}`}>
            {placeholder && (
                <div className={`${placeholderSizes[size]}`}>{placeholder.toUpperCase()}</div>
            )}
        </div>
    </div>
  )
}
