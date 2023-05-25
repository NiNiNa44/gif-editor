import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { useLocation, redirect } from 'react-router-dom';
import { Link } from "react-router-dom";



const Setting = () => {
    const location = useLocation();
    const vid = location.state;
    let videoView = vid ? <video
                            id="uploadedVideo" 
                            controls
                            width="250"
                            src = {URL.createObjectURL(vid)}>
                            </video> 
                            :
                            <div>
                                <p>Error: You did not upload a video</p>
                                <Link to="/">Go back</Link>
                            </div>;


    return (
    <div>
    { vid &&
        <video
            id="uploadedVideo" 
            controls
            width="250"
            src = {URL.createObjectURL(vid)}>
        </video>
    }

    { videoView }
    </div>
    );
  };
  
  export default Setting;