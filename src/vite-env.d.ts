/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_OPEN_WEATHER_KEY;
    readonly VITE_GEOAPIFY_KEY;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}