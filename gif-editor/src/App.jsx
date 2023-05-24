import { useState, useEffect } from 'react'
import './App.css'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

// Log all ffmpeg process for debugging purposes
const ffmpeg = createFFmpeg({ log: true});

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [config, setConfig] = useState({start: 0, stop: 1});
  // Set error if time config is longer than the video
  const [error, setError] = useState(false);

// Load ffmpeg
  const load = async() => {
    await ffmpeg.load();
    setReady(true);
  }

  // Runs only on the first render
  useEffect(() => {
    load();
  }, [])

  const convertToGif = async () => {

    //TODO: fetch video duration -> check with time start/stop config


    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));
    await ffmpeg.run('-i', 'test.mp4', '-t', `${config.stop - config.start}`, '-ss', `${config.start}`, '-f', 'gif', 'out.gif');
    const data = ffmpeg.FS('readFile', 'out.gif');

    const url = URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'}));
    setGif(url)
  }

  // Set config attributes
  const handleConfig = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  }

  return ready ? (
    <div className="App">
    <div className="videoView">
    { 
      video && <video 
      controls
      width="250"
      src = {URL.createObjectURL(video)}>
      </video>
    }
    </div>

    <input type="file" accept="video/mp4,video/x-m4v,video/*"
    onChange={(e) => setVideo(e.target.files?.item(0))} />

    <h3>Result</h3>

    <form>
      <label>
        Start time: 
        <input name="start" type="number" onChange={handleConfig} />
      </label>
      <label>
        Stop time: 
        <input name="stop" type="number" onChange={handleConfig} />
      </label>
    </form>

    <button onClick={convertToGif}>Convert</button>

    { gif && <img src={gif} width="250" /> }

    </div>
  )
    :
    (
      <p>Loading...</p>
    )
}

export default App
