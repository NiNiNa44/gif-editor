import { Button } from 'antd'
import { fetchFile } from '@ffmpeg/ffmpeg'




const conversionButton = (ffmpeg, vid, playerState, 
    sliderValues, setConverting, setGif
    ) => {

    const sliderToTime = (duration, sliderValue) => {
        //return Math.round(sliderValue * duration / 100)
        return (sliderValue * duration / 100).toFixed(2);
    }
        
    const convertToGif = async () => {
        setConverting(true);
        const min = sliderToTime(playerState.duration, sliderValues[0]);
        const max = sliderToTime(playerState.duration, sliderValues[1]);
        
        ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(vid));
        await ffmpeg.run('-i', 'test.mp4', '-t', `${max-min}`, '-ss', `${min}`, '-f', 'gif', 'out.gif');
        const data = ffmpeg.FS('readFile', 'out.gif');

        const url = URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'}));
        setGif(url);
        setConverting(false);
    }
    return (<Button onClick={convertToGif}>Convert to Gif</Button>);
    
}

export default conversionButton;