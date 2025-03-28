import Portal from "./Portal";
import Spinner from "./Spinner";

const LoadingOverlay = ({ visible }: { visible: boolean }) => (
    <Portal>
        <div 
            className="absolute z-10 top-0 left-0 w-screen h-screen bg-app-white dark:bg-app-gray transition-opacity"
            style={{
                opacity: visible ? 100 : 0,
                pointerEvents: visible ? "auto" : "none"
            }}
        >
            <div className="w-full h-full flex justify-center items-center">
                <Spinner />
            </div>
        </div>
    </Portal>
)

export default LoadingOverlay;