import { useState, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Upload from './pages/Upload';
import Setting from './pages/Setting';
import Home from './pages/Home';
import GifConverter from './pages/GifConverter'
import NavigationBar from './components/NavigationBar';



const ffmpeg = createFFmpeg({ log: true});

function App() {
  const [ready, setReady] = useState(false);

  // Load ffmpeg
  const load = async() => {
      await ffmpeg.load();
      setReady(true);
  }

  // Runs only on the first render
  useEffect(() => {
      load();                                           
  }, [])

  return ready ? (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/gif-converter" element={<GifConverter ffmpeg={ffmpeg}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
  :
  (
    <p>Loading...</p>
  )
}

export default App
