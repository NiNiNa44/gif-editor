import React from 'react'

const Video = ({vid, id}) => {

    return (
        <video
            className='video'
            controls
            id={id}
            src = {URL.createObjectURL(vid)}>
        </video> 
    );

};

export default React.memo(Video);