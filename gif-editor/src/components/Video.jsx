import React from 'react'

const Video = ({vid, id}) => {

    return (
        <video
            controls
            id={id}
            width="250"
            src = {URL.createObjectURL(vid)}>
        </video> 
    );

};

export default React.memo(Video);