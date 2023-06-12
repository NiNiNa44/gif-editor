import { useState, useEffect, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import MultiStepProgressBar from '../components/ProgressBar';
import Upload from './Upload';
import Setting from './Setting';
import Result from './Result';
import { Container, Col, Row } from 'react-bootstrap';

const GifConverter = ({ffmpeg}) => {
    //const [page, setPage] = useState("pageone");
    const [page, setPage] = useState(1);
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


    return  (
        <div className='editor-container'>
        <Container fluid className='editor-container'>
        
        <Row className='h-75 py-auto'>
            {
                {
                    1: <Upload onButtonClick={nextPage} uploadVideo={uploadVideo} />,
                    2: <Setting onButtonClick={nextPage} ffmpeg={ffmpeg} vid={video} uploadGif={uploadGif} />,
                    3: <Result onButtonClick={nextPage} gif={gif} />
                } [page]
            }
        </Row>
        </Container>
        </div>
    )
    
}

export default GifConverter;

/*
<Row>
        <Col className='center-block'>
            <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        </Col>
        <Col sm={8}></Col>
        </Row>
        */

 /*
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
    */


    /*
    <Row className='justify-content-center'>
        
        <Col >
                <Row className='justify-content-center'>
                { (page != 1) && 
                <Col xs={3}><a onClick={() => previousPageNumber()}>Previous</a></Col> }
               
                
                { (page != 3) && video &&
                <Col xs={3}><a onClick={() => nextPageNumber()}>Next</a></Col> }
                </Row>
        </Col>  
        <Col sm={8}></Col>
        </Row>
    */