import { useEffect, useState } from 'react'
import Video from '../components/Video'
import VideoUpload from '../components/VideoUpload';
import { Spin } from 'antd';
import {Row, Container, Col, Stack} from 'react-bootstrap';
import { Player } from 'video-react';
import "video-react/dist/video-react.css"




const Upload = ({onButtonClick, uploadVideo}) => {
    const [video, setVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    const onUpload = (vid) => {
      setIsLoading(true);
      window.setTimeout(() => setIsLoading(false), 1000);
      uploadVideo(vid);
      setVideo(vid);
    }
   
    return  (
      <Container fluid className='vh-70'>
      <Row className='h-100'>
        <Col>
          <h3 className='m-5'>1. Upload video</h3>
          { !isLoading && video && <button onClick={()=>onButtonClick('pagetwo')}>Next</button> }
        </Col>
        <Col sm={8}>
          <div className='shaded-bg h-100 m-3 d-flex justify-content-center'>
            { !isLoading && video &&
              <Stack>
              <div className='player-wrapper'>
              <Player
                fluid
                className='react-player'
                width='100%'
                height='auto'
                >
                <source src={URL.createObjectURL(video)} />
              </Player>
              </div>
              </Stack>
              
            }
          
            { !video &&
              <VideoUpload
                onUpload = {onUpload}/>
            }
            
            { isLoading && <Spin size='large' className='my-auto'/>}
          </div>
        </Col>
      </Row>
      </Container>
    )
}

export default Upload;
