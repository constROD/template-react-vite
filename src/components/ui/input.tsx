import * as React from 'react';

import { cn } from '@/lib/utils';

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'box-border h-[44px] w-full md:w-full',
          'border-base-400 rounded-2xl border',
          'px-3 md:px-4',
          'placeholder:text-base-400',
          'focus:border-primary-focus focus:border-[2px] focus:outline-none focus:ring-0',
          'disabled:border-base-400 disabled:text-base-400 disabled:bg-white',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
BaseInput.displayName = 'BaseInput';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, required, ...props }, ref) => {
    if (label) {
      return (
        <div className="flex flex-col gap-2">
          <label htmlFor={props.id ?? label} className="text-muted-foreground">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          <BaseInput
            ref={ref}
            className={cn(className, error && 'border-red-500')}
            type={type}
            {...props}
            id={props.id ?? label}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      );
    }

    return <BaseInput ref={ref} className={className} type={type} {...props} />;
  }
);
Input.displayName = 'Input';

export { Input };
