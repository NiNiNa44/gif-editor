import { Link } from "react-router-dom";
import { useState } from 'react'
//import Form from "react-bootstrap/Form";


const Home = () => {
    return (
        <div>
            <Link to="/upload">
                <button className="start-btn">Edit Now</button>
            </Link>
        </div>
    );
}

export default Home;