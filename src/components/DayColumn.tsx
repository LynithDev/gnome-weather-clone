import { useMemo } from "react";
import { Daily } from "../models";
import WeatherIcon from "./WeatherIcon";

interface DayColumnProps {
    daily: Daily;
    highestTemp: number;
    lowestTemp: number;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

const DayColumn = (props: DayColumnProps) => {
    const date = useMemo(() => new Date(props.daily.time), [props.daily]);
    const dayText = useMemo(() => DAYS[date.getUTCDay()], [date]);
    const dayOfMonth = useMemo(() => date.getUTCDate(), [date]);
    const monthText = useMemo(() => MONTHS[date.getUTCMonth()], [date]);

    const stepPercent = useMemo(() => {
        const diff = props.highestTemp - props.lowestTemp;
        const percent = 100 / diff;
        return percent;
    }, [props.highestTemp, props.lowestTemp]);
    
    return (
        <div className="border-gray-200 dark:border-app-gray border-r last:border-none py-6 h-full min-w-20 w-full flex flex-col gap-2">
            <div className="flex flex-col items-center gap-2">
                <h5 className="font-semibold text-xs">{dayText}</h5>
                <h6 className="font-light text-xs">{dayOfMonth} {monthText}</h6>

                <WeatherIcon icon={props.daily.code} className="w-8 h-8 my-4" />
            </div>

            <div className="h-full flex flex-col items-center gap-2">
                <span 
                    style={{ 
                        marginTop: `${(props.highestTemp - props.daily.tempMax) * stepPercent * 5}%`,
                    }} 
                    className="text-yellow-500 font-bold text-sm"
                >{props.daily.tempMax.toFixed(1)}°</span>
                
                <div className="h-full w-4 rounded-full bg-linear-to-t from-blue-500 to-amber-400"></div>
                
                <span 
                    style={{ 
                        marginBottom: `${(props.daily.tempMin - props.lowestTemp) * stepPercent * 5}%`,
                    }}
                    className="text-blue-700 dark:text-blue-500 font-bold text-sm"
                >{props.daily.tempMin.toFixed(1)}°</span>    
            </div>

        </div>
    )
}

export default DayColumn;