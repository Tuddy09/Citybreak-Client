import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page for the React Router example.</p>
            <Link to="/events">Events</Link>
            <br/>
            <Link to="/weather">Weather</Link>
        </div>
    )
}

export default Home;