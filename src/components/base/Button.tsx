import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={twMerge("select-none py-2 px-2 flex flex-row justify-center items-center gap-2 hover:cursor-pointer transition-colors hover:bg-app-input-focus dark:hover:bg-app-input-focus-dark rounded-md", className)} {...rest}>
            {children}
        </div>
    )
}

export default Button;