import { useState, useEffect } from 'react'
import { fetchFile } from '@ffmpeg/ffmpeg'
import { useLocation, redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import Video from '../components/Video'
import VideoPlayer from '../components/VideoPlayer';


const Setting = ({ffmpeg}) => {
    const [gif, setGif] = useState();
    const [config, setConfig] = useState({start: 0, stop: 1});
    // Set error if time config is longer than the video
    const [error, setError] = useState(false);
    const [videoState, setVideoState] = useState(undefined);

    // Use location to pass video from Upload to Setting
    const location = useLocation();
    const vid = location.state;

    let videoView = vid ?  
      <Video vid={vid} id={'uploadedVideo'} />
      :
      <div>
        <p>Error: You did not upload a video</p>
        <Link to="/">Go back</Link>
      </div>;

    const onVidStateChange = (vidState) => {
      setVideoState(vidState);
    }
    

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
        let video = document.getElementById("uploadedVideo");
        
        if (e.target.value > video.duration) {
            console.log(video.duration);
            console.log('Error');
            setError(true);
            return;
        }
        setConfig({ ...config, [e.target.name]: e.target.value });
    }


    return (
    <div>

    { videoView }

    <VideoPlayer
        vid={vid} 
        onStateChange={onVidStateChange}
        />
  
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
    )
  };
  
  export default Setting;