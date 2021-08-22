import React, {ChangeEvent, useRef, useState} from 'react';



const YoutubeVideo: React.FC = () => {




     return (
        <div style={{display: "flex"}} >

            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1P2ov_oidRQ"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />


        </div>
    );
};

export default YoutubeVideo;
