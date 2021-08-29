import React, {ChangeEvent, useRef, useState} from 'react';
import VideoPlayer from "./VideoPlayer";
import {Button} from "@material-ui/core";



const VideoPage: React.FC = () => {

    const buttonRef=useRef<HTMLInputElement>(null)

    const [fileURL,setFileURL]=useState<any>({})

    const upLoad=(e:ChangeEvent<HTMLInputElement>)=>{
        const newFile= e.target.files && e.target.files[0]

        if (newFile){
            setFileURL(window.URL.createObjectURL(newFile))
        }
    }


    return (
        <div>

            <VideoPlayer fileURL={fileURL}/>


            <div>
                <input type="file"
                       ref={buttonRef}
                       accept=".mp4, .avi"
                       multiple
                       onChange={upLoad}
                       style={{display:"none"}}
                />
                <Button
                    type={'reset'}
                    onClick={() => buttonRef && buttonRef.current && buttonRef.current.click() }
                    variant={'contained'}
                    color={'primary'}>
                    Upload
                </Button>
            </div>


        </div>
    );
};

export default VideoPage;
