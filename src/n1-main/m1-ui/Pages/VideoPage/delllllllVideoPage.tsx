import React, {ChangeEvent, useRef, useState} from 'react';
import VideoPlayer from "./VideoPlayer";
import {Button} from "@material-ui/core";



const DelllllllVideoPage: React.FC = () => {

    const buttonRef=useRef<HTMLInputElement>(null)

    const [file,setFile]=useState<any>()
    const [file64,setFileURL]=useState<any>({})
    const [fileTXT,setFile64]=useState<any>({})

    const upLoad=(e:ChangeEvent<HTMLInputElement>)=>{
        const newFile= e.target.files && e.target.files[0]

        const reader = new FileReader()

        if (newFile){setFile(newFile)
            setFileURL(window.URL.createObjectURL(newFile))

            // save in function.options what we read in file
            reader.onloadend =()=>{setFile64(reader.result)}
        }
    }


    return (
        <div>

            <VideoPlayer fileURL={"https://www.youtube.com/watch?v=SupnJ_Hdpnk"}/>


            <div>
                <input type="file"
                       ref={buttonRef}
                       accept=".jpg,.jpeg,.png"
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

export default DelllllllVideoPage;
