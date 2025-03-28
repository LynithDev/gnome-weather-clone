import { CheckIcon, SearchIcon } from "lucide-react";
import useConfig, { Location } from "../stores/useConfig";
import Button from "./base/Button";
import Portal from "./base/Portal"
import TextInput from "./base/TextInput";
import { FormEvent, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import helpers from "../utils/api";
import { GeocodeResult } from "../models";

interface LocationPickerProps {
    visible: boolean;
    setVisible: (value: boolean) => unknown;
    mount: HTMLElement | null;
}

const LocationPicker = (props: LocationPickerProps) => {
    const location = useConfig(state => state.location);
    const setLocation = useConfig(state => state.setLocation);
    const setCoords = useConfig(state => state.setCoords);
    const fetchCoords = useConfig(state => state.fetchCoords);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<GeocodeResult[]>([]);

    const onInput = useDebounce((e: FormEvent<HTMLInputElement>) => {
        setQuery((e.target as HTMLInputElement).value);
    }, 1000);
    
    useEffect(() => {
        if (query.length < 2) return;

        helpers.geocoding(query).then((res) => setResults(res.results));
    }, [query]);

    const chooseLocation = (result: GeocodeResult) => {
        setLocation({
            city: result.city,
            state: result.state,
            country: result.country
        });

        setCoords({
            lat: result.lat,
            lon: result.lon
        });

        props.setVisible(false);
    }

    const autoDetect = () => {
        fetchCoords();
    }

    return props.visible && (
        <Portal mount={props.mount}>
            <div className="absolute z-2 mt-1 md:left-0 shadow-lg border border-app-gray/20 bg-app-white dark:bg-app-gray rounded-lg w-[90vw] h-[80vh] md:w-auto md:h-auto mx-2 max-md:right-0">
                <div className="flex flex-col gap-2 min-h-58 h-full md:max-h-72 overflow-y-auto p-2">
                    <TextInput 
                        onChange={onInput} 
                        icon={<SearchIcon className="w-4 opacity-70" />} 
                        type="text" 
                        placeholder="Search for cities..." 
                    />
                    
                    <div className="flex-1 flex flex-col gap-2">
                        {location && <LocationItem location={location} checked />}
                        
                        {results.map((res, index) => {
                            if (location && location.city === res.city) return null;

                            const loc: Location = { 
                                city: res.city,
                                state: res.state,
                                country: res.country,
                            }

                            return (
                                <LocationItem
                                    key={index}
                                    location={loc}
                                    onClick={() => chooseLocation(res)}
                                />
                            )
                        })}

                        <Button className="text-xs w-fit mx-auto mt-auto" onClick={autoDetect}>Auto Detect</Button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default LocationPicker;

interface LocationItemProps { 
    location: Location,
    checked?: boolean, 
    onClick?: () => unknown 
}

const LocationItem = ({ location, checked, onClick }: LocationItemProps) => (
    <Button onClick={onClick} className="p-2 flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-1">
            <span className="text-sm">{location.city}{location.state && `, ${location.state}`}</span>
            <small className="text-xs">{location.country}</small>
        </div>

        {checked && <CheckIcon className="w-4 h-4 ml-auto" />}
    </Button>
) 