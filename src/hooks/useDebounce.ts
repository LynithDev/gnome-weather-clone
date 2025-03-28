import { useRef } from "react";

const useDebounce = <T>(cb: (...args: T[]) => unknown, delay: number) => {
    const timeoutId = useRef<number | undefined>(undefined);
    
    return function (...args: T[]) {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => cb(...args), delay)
    }
}

export default useDebounce;