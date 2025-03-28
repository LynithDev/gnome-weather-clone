import { DetailedHTMLProps, InputHTMLAttributes, JSX, useMemo } from "react";
import { twMerge } from "tailwind-merge";

const TextInput = ({ icon, name, className, ...rest }: { icon?: JSX.Element } & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    const properId = useMemo(() => name ?? Math.random().toString(36).substring(7), [name]);
    
    return (
        <label htmlFor={properId} className={twMerge("flex flex-row gap-2 bg-app-input-focus dark:bg-app-input-focus-dark transition-shadow focus:ring-2 hover:ring-2 ring-app-accent text-sm px-2 py-1 rounded-md", className)}>
            {!!icon && icon}
            <input id={properId} className="box-border w-full outline-none text-current" {...rest} />
        </label>
    )
}

export default TextInput;