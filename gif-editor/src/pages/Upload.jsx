import { useState } from 'react'
//import Setting from './Setting'
import { Outlet, Link } from "react-router-dom";



const Upload = () => {
    const [video, setVideo] = useState();
   
    return  (
      <div className="App">
      <div className="videoView">
      { 
        video && 
        <video
        id="uploadedVideo" 
        controls
        width="250"
        src = {URL.createObjectURL(video)}>
        </video>
      }
      </div>
  
      <input type="file" accept="video/mp4,video/x-m4v,video/*"
      onChange={(e) => setVideo(e.target.files?.item(0))} />
  
     
      <Link to="setting" state={video}>
        <button>Next</button>
        </Link>
    
      </div>
    )
      
}

export default Upload;
