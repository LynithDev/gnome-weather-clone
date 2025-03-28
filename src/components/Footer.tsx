import useWeather from "../stores/useWeather";
import RelativeTime from "./base/RelativeTime";

const Footer = () => {
    const lastFetched = useWeather(state => state.lastFetched);

    return (
        <footer className="p-4 flex flex-col justify-center gap-1">
            <RelativeTime time={lastFetched ?? Date.now()} text="Last fetched %s." className="text-xs font-light" />
            <span className="text-xs opacity-55 font-light">Weather data from <a className="text-blue-400 underline" href="https://open-meteo.com/">OpenMeteo</a></span>
        </footer>
    )
}

export default Footer;