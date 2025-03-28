import helpers from "./utils/api";

export type PromiseInnerType<T> = T extends Promise<infer R> ? R : never; 

export type WeatherData = PromiseInnerType<ReturnType<typeof helpers.weatherCoords>>;
export type Daily = WeatherData["daily"][number];

export interface GeocodeResults {
    results: GeocodeResult[]
}
  
export interface GeocodeResult {
    city: string
    state: string
    country: string
    country_code: string
    lon: number
    lat: number
    rank: GeocodeResultRank
}
  
export interface GeocodeResultRank {
    confidence: number
    confidence_city_level: number
}

export interface ReverseGeocodeResults {
    results: ReverseGeocodeResult[]
}

export interface ReverseGeocodeResult {
    city: string
    state: string
    country: string
    country_code: string
    lon: number
    lat: number
    rank: GeocodeResultRank
}