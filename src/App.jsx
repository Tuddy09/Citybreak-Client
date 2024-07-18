import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import EventsPage from "./EventsPage.jsx";
import WeatherPage from "./WeatherPage.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/weather" element={<WeatherPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
