import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Video from '../components/Video'
import VideoUpload from '../components/VideoUpload';
import { Spin } from 'antd';


const Upload = () => {
    const [video, setVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    const onUpload = (vid) => {
      setIsLoading(true);
      window.setTimeout(() => setIsLoading(false), 1000)
      setVideo(vid)
    }

   
    return  (
      <div className="App">

      { !isLoading && video && 
        <div>
          <Video vid={video} id={'uploadedVideo'} />
          <Link to="/setting" state={video}>
            <button>Next</button>
          </Link>
        </div>
      }
    
      { !video &&
        <VideoUpload 
          disabled = { false }
          onUpload = {onUpload}
        />
      }

      { isLoading && <Spin /> }
    
      </div>
    )
}

export default Upload;
