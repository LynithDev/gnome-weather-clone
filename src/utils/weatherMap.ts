import SunSmall from "../assets/weather-clear-small.svg?react";
import CloudSunSmall from "../assets/weather-few-clouds-small.svg?react";
import CloudsSmall from "../assets/weather-overcast-small.svg?react";
import CloudFogSmall from "../assets/weather-fog-small.svg?react";
import CloudDrizzleSmall from "../assets/weather-overcast-small.svg?react";
import CloudRainSmall from "../assets/weather-showers-scattered-small.svg?react";
import CloudSnowSmall from "../assets/weather-snow-small.svg?react";
import CloudLightningSmall from "../assets/weather-storm-small.svg?react";

import SunLarge from "../assets/weather-clear-large.svg?react";
import CloudSunLarge from "../assets/weather-few-clouds-large.svg?react";
import CloudsLarge from "../assets/weather-overcast-large.svg?react";
import CloudFogLarge from "../assets/weather-fog-large.svg?react";
import CloudDrizzleLarge from "../assets/weather-overcast-large.svg?react";
import CloudRainLarge from "../assets/weather-showers-scattered-large.svg?react";
import CloudSnowLarge from "../assets/weather-snow-large.svg?react";
import CloudLightningLarge from "../assets/weather-storm-large.svg?react";

// https://open-meteo.com/en/docs
const mapping = [
    { desc: "Clear", icon: SunSmall, iconLarge: SunLarge },
    { desc: "Mainly Clear", icon: CloudSunSmall, iconLarge: CloudSunLarge },
    { desc: "Partly Cloudy", icon: CloudSunSmall, iconLarge: CloudSunLarge },
    { desc: "Cloudy", icon: CloudsSmall, iconLarge: CloudsLarge },
    { desc: "Foggy", icon: CloudFogSmall, iconLarge: CloudFogLarge },
    { desc: "Drizzle", icon: CloudDrizzleSmall, iconLarge: CloudDrizzleLarge },
    { desc: "Rain", icon: CloudRainSmall, iconLarge: CloudRainLarge },
    { desc: "Snow", icon: CloudSnowSmall, iconLarge: CloudSnowLarge },
    { desc: "Rain Showers", icon: CloudRainSmall, iconLarge: CloudRainLarge },
    { desc: "Thunderstorm", icon: CloudLightningSmall, iconLarge: CloudLightningLarge },
] as const;

export default mapping;