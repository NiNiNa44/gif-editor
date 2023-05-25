import { useState, useEffect } from 'react'
import './App.css'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from './pages/Upload';
import Setting from './pages/Setting';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
