import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Video from '../components/Video'
import VideoUpload from '../components/VideoUpload';
import { Spin } from 'antd';
import MultiStepProgressBar from '../components/ProgressBar';



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
      <div>
      <h3>Upload your video!</h3>
      { !isLoading && video && 
        <div>
          <Video vid={video} id={'uploadedVideo'} />
          <button onClick={()=>onButtonClick('pagetwo')}>Next</button>
        </div>
      }
    
      { !video &&
        <VideoUpload 
          onUpload = {onUpload}
        />
      }

      { isLoading && <Spin /> }
    
      </div>
    )
}

export default Upload;
