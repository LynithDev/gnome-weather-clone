import { useMemo } from "react";
import DayColumn from "./DayColumn";
import useWeather from "../stores/useWeather";

const DayWeather = () => {
    const data = useWeather(state => state.weather);

    const temps = useMemo(() => {
        let highest: number | null = null;
        let lowest: number | null = null;

        data?.daily.forEach((value) => {
            if (highest === null || value.tempMax > highest) {
                highest = value.tempMax;
            }

            if (lowest === null || value.tempMin < lowest) {
                lowest = value.tempMin;
            }
        });

        return { highest, lowest };
    }, [data])

    return (
        <div className="h-full flex flex-row flex-nowrap overflow-auto">
            {data && data.daily.map((value, index) => (
                <DayColumn
                    key={index} 
                    highestTemp={temps.highest || value.tempMax}
                    lowestTemp={temps.lowest || value.tempMin}
                    daily={value} 
                />
            ))}
        </div>
    )
}

export default DayWeather;