import Footer from "./components/Footer";
import Header from "./components/Header";
import DayWeather from "./components/DayWeather";
import Preloading from "./components/Preloading";

function App() {
    return (
        <div className="flex flex-col max-w-5xl m-auto h-screen">
            <Header />

            <div className="bg-app-white-secondary dark:bg-app-gray-secondary h-full shadow lg:rounded-lg">
                <DayWeather />
            </div>

            <Footer />

            <Preloading />            
        </div>
    )
}

export default App;
