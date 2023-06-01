import { Link } from "react-router-dom";
import { useState } from 'react'

//import Form from "react-bootstrap/Form";


const Home = () => {
    return (
        <div>
            <h1>GIF Converter</h1>
            <p>Convert your videos to animated GIFs</p>
            <Link to="/gif-converter">
                <button className="start-btn">Edit Now</button>
            </Link>
        </div>
    );
}

export default Home;