import { useEffect, useState } from "react";
import Button from "./base/Button";
import Portal from "./base/Portal";
import useConfig from "../stores/useConfig";
import LoadingOverlay from "./base/LoadingOverlay";
import useWeather from "../stores/useWeather";
import helpers from "../utils/api";

const Preloading = () => {
    const lastFetched = useWeather(state => state.lastFetched);
    const fetchAmount = useWeather(state => state.fetchedAmount);
    const updateWeather = useWeather(state => state.refresh);

    const coords = useConfig(state => state.coords);
    const setLocation = useConfig(state => state.setLocation);

    const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false);

    useEffect(() => {
        const visible = coords === null || fetchAmount <= 0 || lastFetched === null;
        setLoadingOverlayVisible(visible);
    }, [coords, fetchAmount, lastFetched]);

    useEffect(() => {
        if (coords !== null) {
            updateWeather();
            
            helpers.reverse(coords).then((res) => {
                if (res.results.length > 0) {
                    const result = res.results[0];
                    setLocation({
                        city: result.city,
                        state: result.state,
                        country: result.country
                    });
                }
            })
        }
    }, [coords, updateWeather, setLocation]);

    return (
        <>
            <LoadingOverlay visible={loadingOverlayVisible} />
            <PermissionOverlay />
        </>
    )
}

export default Preloading;


const PermissionOverlay = () => {
    const [permissionState, setPermissionState] = useState<PermissionState | null>(null);
    const fetchCoords = useConfig(state => state.fetchCoords);
    const coords = useConfig(state => state.coords);

    useEffect(() => {
        if (permissionState === null) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                result.onchange = () => {
                    setPermissionState(result.state);
                }

                setPermissionState(result.state);
            }).catch(() => {
                setPermissionState("denied");
            });
        }
    }, [permissionState]);

    useEffect(() => {
        if (permissionState === "granted") {
            if (coords === null) {
                fetchCoords();
            }
        }
    }, [permissionState, coords, fetchCoords])

    const promptPermission = () => {
        fetchCoords();
    }

    return (
        <Portal>
            {permissionState && permissionState !== "granted" && (
                <div className="absolute z-10 top-0 left-0 w-screen h-screen bg-app-white dark:bg-app-gray flex flex-col justify-center items-center">
                    <p className="text-lg text-app-gray dark:text-app-white">
                        Please enable location access to use this app.
                    </p>
                    {permissionState === "prompt" ? (
                        <Button onClick={promptPermission}>Prompt</Button>
                    ) : (
                        <span className="text-red-400">Permission was denied. Enter your browser settings to allow the location permission!</span>
                    )}
                </div>
            )}
        </Portal>
    )
}
