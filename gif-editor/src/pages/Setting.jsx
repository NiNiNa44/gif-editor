import { useState, useEffect } from 'react'
import { fetchFile } from '@ffmpeg/ffmpeg'
import { Link } from "react-router-dom";
import VideoPlayer from '../components/VideoPlayer';
import { Slider, Spin} from 'antd';

function sliderToTime (duration, sliderValue) {
  //return Math.round(sliderValue * duration / 100)
  return (sliderValue * duration / 100).toFixed(2);
}

const Setting = ({onButtonClick, ffmpeg, vid, uploadGif}) => {
    const [gif, setGif] = useState();
    // Set error if time config is longer than the video
    const [error, setError] = useState(false);
    const [player, setPlayer] = useState();
    const [playerState, setPlayerState] = useState(); 
    // sliderValue[0] = min, sliderValue[1] = max
    const [sliderValues, setSliderValues] = useState([0, 100]);
    const [converting, setConverting] = useState(false); 
   
    /** Player-realated functions **/
    const onPlayerChange = (player) => {
      setPlayer(player);
    }

    const onPlayerStateChange = (state) => {
      setPlayerState(state);
    }


    /** Slider functions **/
    // Change player starting point
    useEffect(() => {
      const min = sliderValues[0];
      if (min !== undefined && playerState && player) {
        player.seek(sliderToTime(playerState.duration));
      }
    }, [sliderValues])
  
    // Force player to play within min/max
    useEffect(() => {
     
      if (player && playerState) {
        const min = sliderValues[0];
        const max = sliderValues[1];
        const minTime = sliderToTime(playerState.duration, min);
        const maxTime = sliderToTime(playerState.duration, max);

        if (playerState.currentTime < minTime || playerState.currentTime > maxTime) {
          player.seek(minTime)
        }
      }
    }, [playerState])

    const formatter = (value) => `${sliderToTime(playerState.duration, value)}`;

    const convertToGif = async () => {
        if (error)
            return
        setConverting(true);
        const min = sliderToTime(playerState.duration, sliderValues[0]);
        const max = sliderToTime(playerState.duration, sliderValues[1]);

        ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(vid));
        await ffmpeg.run('-i', 'test.mp4', '-t', `${max - min}`, '-ss', `${min}`, '-f', 'gif', 'out.gif');
        const data = ffmpeg.FS('readFile', 'out.gif');

        const url = URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'}));
        setGif(url);
        uploadGif(gif);
        setConverting(false);
        onButtonClick('pagethree');
    }

    return (
    <div>
    { vid &&
      <VideoPlayer
        vid={vid} 
        step={0.1}
        onPlayerChange={onPlayerChange}
        onStateChange={onPlayerStateChange}
        />
    }
    
    {playerState &&
      <Slider
      value={sliderValues}
      tooltip={{formatter}}
      range={true}
      onChange={(values) => setSliderValues(values)}
      step={0.01}
     />
    }
    
    <h3>Result</h3>
        <button onClick={convertToGif}>Convert</button>
        { converting && <Spin />}
    
        { gif && <img src={gif} width="250" /> }
    
        { error && <p>Error: start and stop time must be within the video duration</p> }
        

      </div>
    )
  };
  
  export default Setting;

  /*
  {playerState &&
    <form>
      <label>
        Start time: 
        <input name="start" type="number" onChange={handleStart} value={sliderToTime(playerState.duration, sliderValues[0])}/>
      </label>
      <label>
        Stop time: 
        <input name="stop" type="number" onChange={handleStop} value={sliderToTime(playerState.duration, sliderValues[1])}/>
      </label>
    </form>
  }
  */

  /*
  const handleStart = (e) => {
    if (e.target.value > playerState.duration ) {
      console.log('Error');
      setError(true);
      return;
    }
    //setSliderValues([timeToSlider(playerState.duration, e.target.value), sliderValues[1]])
  }

  const handleStop = (e) => {
    if (e.target.value > playerState.duration) {
      console.log('Error');
      setError(true);
      return;
    }
    setSliderValues([sliderValues[0], timeToSlider(playerState.duration, e.target.value)])
  }


  let videoView = vid ?  
  <div></div>
  :
  <div>
    <p>Error: You did not upload a video</p>
    <Link to="/">Go back</Link>
  </div>;
  */