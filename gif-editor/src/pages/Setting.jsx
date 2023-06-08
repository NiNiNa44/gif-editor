import { useState, useEffect } from 'react'
import { fetchFile } from '@ffmpeg/ffmpeg'
import VideoPlayer from '../components/VideoPlayer';
import { Slider, Spin} from 'antd';
import { Container, Row, Col, Stack} from 'react-bootstrap';
import RadioButton from '../components/RadioButton';

function sliderToTime (duration, sliderValue) {
  //return Math.round(sliderValue * duration / 100)
  return (sliderValue * duration / 100).toFixed(2);
}

const Setting = ({onButtonClick, ffmpeg, vid, uploadGif}) => {
    // Set error if time config is longer than the video
    //const [error, setError] = useState(false);
    const [player, setPlayer] = useState();
    const [playerState, setPlayerState] = useState(); 
    // sliderValue[0] = min, sliderValue[1] = max
    const [sliderValues, setSliderValues] = useState([0, 100]);
    const [converting, setConverting] = useState(false); 
    const [quality, setQuality] = useState('Large');
   
    /** Player-realated functions **/
    const onPlayerChange = (player) => {
      setPlayer(player);
    }

    const onPlayerStateChange = (state) => {
      setPlayerState(state);
    }

    const onRadioChange = (e) => {
      setQuality(e.target.value);
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
       
        setConverting(true);
        const min = sliderToTime(playerState.duration, sliderValues[0]);
        const max = sliderToTime(playerState.duration, sliderValues[1]);

        ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(vid));
        await ffmpeg.run('-i', 'test.mp4', '-t', `${max - min}`, '-ss', `${min}`, '-f', 'gif', 'out.gif', '-filter_complex', '"fps=12"');
        const data = ffmpeg.FS('readFile', 'out.gif');

        const url = URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'}));
        uploadGif(url);
        setConverting(false);
        onButtonClick('pagethree');
    }

    return (
    <Container fluid className='vh-70'>
    <Row className='h-100'>
    <Col>
      <h3 className='mx-5 my-3'>Convert to GIF</h3>
      <Stack>
        <RadioButton 
          onRadioChange={onRadioChange} 
          quality={quality}
          />
        <button className='mx-5 my-3' onClick={convertToGif}>OK</button> 
      </Stack>
    </Col>
    <Col sm={8}>
    <div className='shaded-bg h-100 d-flex m-3 justify-content-center'>
    <Stack>
    
      { !converting && vid &&
        <div className='player-wrapper'>
          <VideoPlayer
            vid={vid} 
            step={0.1}
            onPlayerChange={onPlayerChange}
            onStateChange={onPlayerStateChange}
            />
          </div>
      }
      
      
      { !converting && playerState &&
        <div className='h-50'>
        <Slider
        value={sliderValues}
        tooltip={{formatter}}
        range={true}
        onChange={(values) => setSliderValues(values)}
        step={0.01}
        className='slider-wrapper'/>
        </div>
      }
      { converting && <Spin className='my-auto' />}
      
      </Stack>

      
    </div>
    </Col>
    </Row>
    </Container>
    )
  };
  
  export default Setting;
