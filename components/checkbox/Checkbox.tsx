"use client"
import React, { InputHTMLAttributes, MutableRefObject, forwardRef } from "react";
import { useEffect, useRef } from "react";
import { sizeType } from "../ui.types";

interface Props {
  indeterminate?: boolean;
  // name?: string;
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    checkboxSize?: sizeType;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error' | 'none';
    label?: string;
    className?: string | undefined;
    indeterminate?: boolean | undefined;
}

const useCombinedRefs = (...refs: any[]): React.MutableRefObject<any> => {
  const targetRef = React.useRef();

  React.useEffect(() => {
    // refs.forEach(ref => {
    //   if (!ref) return;

    //   if (typeof ref === 'function') {
    //     ref(targetRef.current);
    //   } else {
    //     ref.current = targetRef.current;
    //   }
    // });
  }, [refs]);

  return targetRef;
};

const Checkbox = forwardRef<HTMLInputElement, Props & CheckboxProps>(
    ({checkboxSize='small', disabled=false, color='none', label, className, indeterminate, ...props} : CheckboxProps, ref: React.Ref<HTMLInputElement>) => {

    const defaultRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);
    
    const checkboxSizes = {
        tiny: 'checkbox-xs',
        small: 'checkbox-sm',
        normal: 'checkbox-md',
        large: 'checkbox-lg',
    }
    const checkboxColors = {
        primary: 'checkbox-primary',
        secondary: 'checkbox-secondary',
        accent: 'checkbox-accent',
        success: 'checkbox-success',
        warning: 'checkbox-warning',
        info: 'checkbox-info',
        error: 'checkbox-error',
        none: ''
    }

    useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [combinedRef, indeterminate]);

    return <>
        {label ? 
            <div className="form-control">
            <label className="label cursor-pointer">
                <div className="label-text">{label}</div> 
                <input type="checkbox" ref={combinedRef} disabled={disabled} className={`checkbox ${checkboxSizes[checkboxSize]} ${color && checkboxColors[color]} ${className}`} {...props} />
            </label>
            </div>
        :
            <input type="checkbox" ref={combinedRef} disabled={disabled} className={`checkbox ${checkboxSizes[checkboxSize]} ${checkboxColors[color]} ${className}`} {...props} />
        }
    </>
});

Checkbox.displayName = 'Checkbox';


export default Checkbox;
