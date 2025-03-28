import { ChevronDown, ChevronUp } from "lucide-react";
import useWeather from "../stores/useWeather";
import WeatherIcon from "./WeatherIcon";
import Button from "./base/Button";
import { useRef, useState } from "react";
import LocationPicker from "./LocationPicker";
import useConfig from "../stores/useConfig";

const Header = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const location = useConfig(state => state.location);
    const data = useWeather(state => state.weather);
    const div = useRef<HTMLDivElement>(null);

    const toggleVisibility = () => {
        setPopupVisible(!popupVisible);
    }

    return (
        <div className="h-34 flex flex-row justify-start items-center">
            <div className="flex flex-row items-center gap-3 pl-4 lg:pl-0">
                <WeatherIcon icon={0} size="large" className="w-20 h-20" />
                <div className="flex flex-col items-start justify-end gap-2 my-10">
                    <div className="static md:relative" ref={div}>
                        <Button onClick={toggleVisibility}>
                            <span className="font-semibold text-sm">
                                {location ? (
                                    [location.city, location.state, location.country].filter(res => !!res).join(", ")
                                ) : (
                                    "Unknown location"
                                )}
                            </span>

                            {popupVisible ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </Button>

                        <LocationPicker 
                            visible={popupVisible} 
                            setVisible={setPopupVisible} 
                            mount={div.current}
                        />
                    </div>

                    <div className="ml-2 flex flex-row items-end gap-2">
                        <span className="text-4xl font-black">{data?.current.temperature.toFixed(1)}°</span>
                        <span className="text-xs font-light">Feels like {data?.current.apparentTemperature.toFixed(1)}°</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;