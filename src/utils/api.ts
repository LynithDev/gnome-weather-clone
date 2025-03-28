import { fetchWeatherApi } from "openmeteo";
import { Coords } from "../stores/useConfig";
import { GeocodeResults, ReverseGeocodeResults } from "../models";

const wrappers = {
    geoapify: (url: string, params: URLSearchParams, opts: RequestInit) => {
        const realUrl = new URL(`/v1${url}`, "https://api.geoapify.com/");
        params.set("apiKey", import.meta.env.VITE_GEOAPIFY_KEY);
        params.forEach((value, key) => {
            realUrl.searchParams.set(key, value);
        });

        return fetch(realUrl.toString(), opts);
    }
}

const helpers = {
    weather: async ({ lat, lon }: Coords) => {
        const params = {
            "latitude": lat,
            "longitude": lon,
            "daily": [
                "weather_code", 
                "temperature_2m_max", 
                "temperature_2m_min", 
                "wind_speed_10m_max",
                "wind_direction_10m_dominant",
                "precipitation_probability_mean",
                "relative_humidity_2m_mean", 
                "surface_pressure_mean",
            ],
            "current": [
                "temperature_2m", 
                "weather_code", 
                "apparent_temperature"
            ],
            "forecast_days": 10,
            "timeformat": "unixtime",
            "timezone": "auto"
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        
        const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        const response = responses[0]!; // We only want 1 location at a time

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();

        const daily = response.daily()!;
        const current = response.current()!;

        const dailyWeather = {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => ((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            temperature2mMin: daily.variables(2)!.valuesArray()!,
            windSpeed10mMax: daily.variables(3)!.valuesArray()!,
            windDirection10mDominant: daily.variables(4)!.valuesArray()!,
            precipitationProbability: daily.variables(5)!.valuesArray()!,
            humidity: daily.variables(6)!.valuesArray()!,
            pressureMean: daily.variables(7)!.valuesArray()!,
        };

        const mappedData = [];

        for (let i = 0; i < dailyWeather.time.length; i++) {
            mappedData.push({
                time: dailyWeather.time[i],
                code: dailyWeather.weatherCode[i],
                tempMax: dailyWeather.temperature2mMax[i],
                tempMin: dailyWeather.temperature2mMin[i],
                windSpeed: dailyWeather.windSpeed10mMax[i],
                windDir: dailyWeather.windDirection10mDominant[i],
                precipitationProbability: dailyWeather.precipitationProbability[i],
                humidity: dailyWeather.humidity[i],
                pressure: dailyWeather.pressureMean[i]
            })
        }

        return {
            timestamp: utcOffsetSeconds * 1000,
            timezoneLoc: timezone,
            timezoneAbb: timezoneAbbreviation,
            latitude,
            longitude,
            daily: mappedData,
            current: {
                time: (Number(current.time()) + utcOffsetSeconds) * 1000,
                temperature: current.variables(0)!.value(),
                weatherCode: current.variables(1)!.value(),
                apparentTemperature: current.variables(2)!.value(),
            },
        }
    },
    geocoding: (query: string): Promise<GeocodeResults> => {
        return wrappers.geoapify(
            "/geocode/search",
            new URLSearchParams({
                text: query,
                type: "city",
                limit: "4",
                format: "json",
            }),
            {
                method: "GET"
            }
        ).then(res => res.json())
    },
    reverse: ({ lat, lon }: Coords): Promise<ReverseGeocodeResults> => {
        return wrappers.geoapify(
            "/geocode/reverse",
            new URLSearchParams({
                lat: `${lat}`,
                lon: `${lon}`,
                format: "json"
            }),
            {
                method: "GET"
            }
        ).then((res) => res.json())
    }
}

export { wrappers, helpers };
export default helpers;