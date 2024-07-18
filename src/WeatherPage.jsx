import {useState} from "react";
import api from "./utils.jsx";

function WeatherPage() {
    const [weathers, setWeathers] = useState([]);

    function showWeathers() {
        fetch(api + 'weather')
            .then(response => response.json())
            .then(data => setWeathers(data)).then(() => console.log(weathers));
    }

    function addWeather(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        const newWeather = {
            id: data.get('id'),
            city: data.get('city'),
            date: data.get('date'),
            temperature: data.get('temperature'),
            humidity: data.get('humidity'),
            description: data.get('description')
        }
        fetch(api + 'weather', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newWeather)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add weather');
                }
                return response.json();
            })
            .then(() => setWeathers([...weathers, newWeather]))
            .then(() => alert('Weather added successfully')).catch(error => alert(error.message));
    }

    function deleteWeather(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        fetch(api + 'weather?id=' + data.get('id'), {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete weather');
                }
            })
            .then(() => setWeathers(weathers.filter(e => e.id !== data.get('id')))
            ).then(() => alert('Weather deleted successfully')).catch(error => alert(error.message));
    }

    function updateWeather(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        const updatedWeather = {
            city: data.get('city'),
            date: data.get('date'),
            temperature: data.get('temperature'),
            humidity: data.get('humidity'),
            description: data.get('description')
        }
        fetch(api + 'weather?id=' + data.get('id'), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedWeather)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update weather');
                }
            })
            .then(() => setWeathers(weathers.map(e => e.id === data.get('id') ? updatedWeather : e))
            ).then(() => alert('Weather updated successfully')).catch(error => alert(error.message));
    }

    function filterByCityAndDate(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        fetch(api + 'weather?city=' + data.get('city') + '&date=' + data.get('date'))
            .then(response => response.json())
            .then(data => setWeathers(data));
    }

    return (
        <>
            <h2>Weather</h2>
            <ul>
                {weathers.map(weather => (
                    <li key={weather.id}>{weather.id} - {weather.city} - {weather.date} - {weather.temperature} - {weather.humidity} - {weather.description}</li>
                ))}
            </ul>
            <button onClick={showWeathers}>Show all weather</button>
            <h2>Filter by city</h2>
            <form onSubmit={filterByCityAndDate}>
                <label>
                    City:
                    <input type='text' name='city'/>
                    Date:
                    <input type='text' name='date'/>
                </label>
                <button type="submit">Filter</button>
            </form>
            <h2>Add new weather</h2>
            <form onSubmit={addWeather}>
                <label>
                    Id:
                    <input type='text' name='id'/>
                    City:
                    <input type="text" name="city"/>
                    Date:
                    <input type="text" name="date"/>
                    Temperature:
                    <input type="text" name="temperature"/>
                    Humidity:
                    <input type="text" name="humidity"/>
                    Description:
                    <input type="text" name="description"/>
                </label>
                <button type="submit">Add weather</button>
            </form>
            <h2>Delete weather</h2>
            <form onSubmit={deleteWeather}>
                <label>
                    Id:
                    <input type='text' name='id'/>
                </label>
                <button type="submit">Delete weather</button>
            </form>
            <h2>Update weather</h2>
            <form onSubmit={updateWeather}>
                <label>
                    Id:
                    <input type='text' name='id'/>
                    City:
                    <input type="text" name="city"/>
                    Date:
                    <input type="text" name="date"/>
                    Temperature:
                    <input type="text" name="temperature"/>
                    Humidity:
                    <input type="text" name="humidity"/>
                    Description:
                    <input type="text" name="description"/>
                </label>
                <button type="submit">Update event</button>
            </form>
        </>
    )
}

export default WeatherPage;