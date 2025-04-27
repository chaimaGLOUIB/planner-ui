import { forwardRef, type InputHTMLAttributes } from "react";
import cn from 'clsx'

type TypeTransparentFeild = InputHTMLAttributes<HTMLInputElement>

export const TransparentFeild = forwardRef<
    HTMLInputElement,
    TypeTransparentFeild
>(({ className, ...rest }, ref) => {
    return (
        <input
            className={cn(
                'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full',
                className
            )}
            ref={ref}
            {...rest}
        />
    )
})

TransparentFeild.displayName = 'TransparentField'