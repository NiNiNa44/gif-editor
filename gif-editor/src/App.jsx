import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from './pages/Upload';
import Setting from './pages/Setting';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Upload />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
