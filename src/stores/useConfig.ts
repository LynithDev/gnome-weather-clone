import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Coords { 
    lat: number,
    lon: number, 
}

export interface Location {
    city: string,
    state?: string | undefined,
    country: string,
}

interface ConfigState {
    location: Location | null,
    coords: Coords | null,
    setLocation: (loc: Location) => void;
    setCoords: (coords: Coords) => void;
    fetchCoords: () => Promise<Coords>;
    reset: () => void;
}

const useConfig = create<ConfigState>()(
    persist(
        (set) => ({
            location: null,
            coords: null,
            setLocation: (loc) => set({ location: loc }),
            setCoords: (coords) => set({ coords: coords }),
            reset: () => set({ coords: null, location: null }),
            fetchCoords: () => {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            const coords: Coords = {
                                lat: pos.coords.latitude,
                                lon: pos.coords.longitude
                            }
                            
                            set({ coords });
                            resolve(coords);
                        }, 
                        (err) => {
                            reject(err);
                        }
                    );
                })
            },
        }),
        {
            name: "config",
        }
    )
);

export default useConfig;