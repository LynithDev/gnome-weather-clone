import { create } from "zustand";
import { WeatherData } from "../models";
import helpers from "../utils/api";
import useConfig from "./useConfig";

interface WeatherStore {
    weather: WeatherData | null,
    isFetching: boolean,
    fetchedAmount: number,
    lastFetched: number | null,
    refresh: () => Promise<void>, 
}

const useWeather = create<WeatherStore>()(
    (set, get) => ({
        weather: null,
        isFetching: false,
        fetchedAmount: 0,
        lastFetched: null,
        refresh: async () => {
            const loc = useConfig.getState().coords;
            if (loc === null) return;

            set({ isFetching: true, fetchedAmount: get().fetchedAmount + 1 })
            const value = await helpers.weather(loc);
            set({ isFetching: false, weather: value, lastFetched: Date.now() })
        }
    })
)

export default useWeather;