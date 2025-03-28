import { SVGProps, useMemo } from "react";
import mapping from "../utils/weatherMap";

interface WeatherIconProps { 
    icon: number,
    size?: "small" | "large"
}

const WeatherIcon = ({ icon, size = "small", ...rest }: WeatherIconProps & SVGProps<SVGSVGElement>) => {
    const iconId = useMemo(() => icon < 10 ? icon : Math.floor(icon / 10), [icon]);
    const Icon = useMemo(() => {
        const value = (mapping[iconId] ?? mapping[0]);
        return size === "small" ? value.icon : value.iconLarge;
    }, [iconId, size]);

    return (
        <Icon {...rest} />
    );
}

export default WeatherIcon;