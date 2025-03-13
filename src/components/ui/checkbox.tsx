import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const BaseCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'h-5 w-5 shrink-0',
      'border-base-400 rounded-sm border ring-offset-background',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'peer',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
BaseCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, error, required, ...props }, ref) => {
    if (label) {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BaseCheckbox
              ref={ref}
              className={cn(className, error && 'border-red-500')}
              {...props}
              id={props.id ?? label}
            />
            <label
              htmlFor={props.id ?? label}
              className={cn(
                'text-sm font-medium leading-none text-muted-foreground',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              )}
            >
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </label>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      );
    }

    return <BaseCheckbox ref={ref} className={className} {...props} />;
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
