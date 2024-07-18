import {useState} from "react";
import api from "./utils.jsx";

function EventsPage() {
    const [events, setEvents] = useState([]);

    function showEvents() {
        fetch(api + 'events')
            .then(response => response.json())
            .then(data => setEvents(data)).then(() => console.log(events));
    }

    function addEvent(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        const newEvent = {
            id: data.get('id'),
            city: data.get('city'),
            date: data.get('date'),
            title: data.get('title'),
            description: data.get('description')
        }
        fetch(api + 'events', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newEvent)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add event');
                }
                return response.json();
            })
            .then(() => setEvents([...events, newEvent]))
            .then(() => alert('Event added successfully')).catch(error => alert(error.message));
    }


    function deleteEvent(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        fetch(api + 'events?id=' + data.get('id'), {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete event');
                }
            })
            .then(() => setEvents(events.filter(e => e.id !== data.get('id')))
            ).then(() => alert('Event deleted successfully')).catch(error => alert(error.message));
    }

    function updateEvent(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        const updatedEvent = {
            city: data.get('city'),
            date: data.get('date'),
            title: data.get('title'),
            description: data.get('description')
        }
        fetch(api + 'events?id=' + data.get('id'), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedEvent)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update event');
                }
                return response.json();
            })
            .then(() => setEvents(events.map(e => e.id === data.get('id') ? updatedEvent : e))
            ).then(() => alert('Event updated successfully')).catch(error => alert(error.message));
    }

    function filterByCity(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        fetch(api + 'events?city=' + data.get('city'))
            .then(response => response.json())
            .then(data => setEvents(data));
    }

    return (
        <>
            <h2>Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.id} - {event.city} - {event.date} - {event.title} - {event.description}</li>
                ))}
            </ul>
            <button onClick={showEvents}>Show all events</button>
            <h2>Filter by city</h2>
            <form onSubmit={filterByCity}>
                <label>
                    City:
                    <input type="text" name="city"/>
                </label>
                <button type="submit">Filter events</button>
            </form>
            <h2>Add new event</h2>
            <form onSubmit={addEvent}>
                <label>
                    Id:
                    <input type='text' name='id'/>
                    City:
                    <input type="text" name="city"/>
                    Date:
                    <input type="text" name="date"/>
                    Title:
                    <input type="text" name="title"/>
                    Description:
                    <input type="text" name="description"/>
                </label>
                <button type="submit">Add event</button>
            </form>
            <h2>Delete event</h2>
            <form onSubmit={deleteEvent}>
                <label>
                    Id:
                    <input type='text' name='id'/>
                </label>
                <button type="submit">Delete event</button>
            </form>
            <h2>Update event</h2>
            <form onSubmit={updateEvent}>
                <label>
                    Id:
                    <input type='text' name='id'/>
                    City:
                    <input type="text" name="city"/>
                    Date:
                    <input type="text" name="date"/>
                    Title:
                    <input type="text" name="title"/>
                    Description:
                    <input type="text" name="description"/>
                </label>
                <button type="submit">Update event</button>
            </form>
        </>
    )
}

export default EventsPage;