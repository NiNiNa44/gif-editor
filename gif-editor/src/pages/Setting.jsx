import { useState, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { useLocation, redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

const ffmpeg = createFFmpeg({ log: true});

const Setting = () => {
    const [ready, setReady] = useState(false);
    const [gif, setGif] = useState();
    const [config, setConfig] = useState({start: 0, stop: 1});
    // Set error if time config is longer than the video
    const [error, setError] = useState(false);

    const location = useLocation();
    const vid = location.state;
    let videoView = vid ? <video
                            id="uploadedVideo" 
                            controls
                            width="250"
                            src = {URL.createObjectURL(vid)}>
                            </video> 
                            :
                            <div>
                                <p>Error: You did not upload a video</p>
                                <Link to="/">Go back</Link>
                            </div>;
    
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
        if (error)
            return

        ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(vid));
        await ffmpeg.run('-i', 'test.mp4', '-t', `${config.stop - config.start}`, '-ss', `${config.start}`, '-f', 'gif', 'out.gif');
        const data = ffmpeg.FS('readFile', 'out.gif');

        const url = URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'}));
        setGif(url)
    }

    // Set config attributes
    const handleConfig = (e) => {
        let vid = document.getElementById("uploadedVideo");
        
        if (e.target.value > vid.duration) {
        console.log('Error');
        setError(true);
        return;
        }
        
        setConfig({ ...config, [e.target.name]: e.target.value });
    }


    return ready ? (
    <div>

    { videoView }
  
    //TODO: [GE-9] hide result result when no video entered
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
  
      { error && <p>Error: start and stop time must be within the video duration</p> }
    </div>
    ):
    (
      <p>Loading...</p>
    );
  };
  
  export default Setting;