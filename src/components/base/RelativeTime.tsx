import { HTMLAttributes, useEffect, useState } from "react";
import { formatAsRelative } from "../../utils/time";

interface RelativeTimeProps {
    time: number,
    text?: string,
    updateEvery?: number
}

const RelativeTime = ({ time, text = "%s", ...rest }: RelativeTimeProps & Omit<HTMLAttributes<HTMLSpanElement>, "children">) => {
    const [formatted, setFormatted] = useState(formatAsRelative(time));

    useEffect(() => {
        const id = setInterval(() => {
            setFormatted(formatAsRelative(time));
        }, 1000);

        return () => clearInterval(id);
    }, [time]);
    
    return (
        <span {...rest}>{text.replace("%s", formatted)}</span>
    )
}

export default RelativeTime;