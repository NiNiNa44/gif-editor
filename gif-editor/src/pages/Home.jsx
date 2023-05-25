import { Outlet, Link } from "react-router-dom";
import { useState } from 'react'
import Form from "react-bootstrap/Form";


const Home = () => {
    return (
        <div>
            <Link to="/">
                <button>Edit Now</button>
            </Link>
            <Form.Control
                type="range"
                name="range"
               
            />
        </div>
    );
}

export default Home;