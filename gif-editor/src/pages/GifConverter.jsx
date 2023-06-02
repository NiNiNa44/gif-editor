import { useState, useEffect, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import MultiStepProgressBar from '../components/ProgressBar';
import Upload from './Upload';
import Setting from './Setting';
import Result from './Result';

const GifConverter = ({ffmpeg}) => {
    const [page, setPage] = useState("pageone");
    const [video, setVideo] = useState();
    const [gif, setGif] = useState(undefined);
    

    const nextPage = (page) => {
        setPage(page);
    };

    const uploadVideo = (vid) => {
        setVideo(vid);
    }

    const uploadGif = (gif) => {
        setGif(gif);
    }

    const nextPageNumber = (pageNumber) => {
        switch (pageNumber) {
        case "1":
            setPage("pageone");
            break;
        case "2":
            setPage("pagetwo");
            break;
        case "3":
            setPage("pagethree");
            break;
        default:
            setPage("1");
        }
        
    };


    return  (
        <div>
            <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
            {
                {
                    pageone: <Upload onButtonClick={nextPage} uploadVideo={uploadVideo} />,
                    pagetwo: <Setting onButtonClick={nextPage} ffmpeg={ffmpeg} vid={video} uploadGif={uploadGif} />,
                    pagethree: <Result onButtonClick={nextPage} gif={gif} />
                } [page]
            }
        </div>
    )
    
}

export default GifConverter;