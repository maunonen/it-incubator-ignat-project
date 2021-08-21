
import React, {ChangeEvent, useRef} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Button } from '@material-ui/core/';
import { useState } from 'react';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            margin: theme.spacing(2, 0),
        },
    }),
);

export default function FilesOperations() {

        const buttonRef=useRef<HTMLInputElement>(null)
        const videoRef=useRef<HTMLVideoElement>(null)

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

    const returnFileSize=(size:number)=>{
      if(size<1024){return size + "bytes"}
      else if (size>1024 && size < 1048576){return (size/1024).toFixed(2) + "Kb"}
      else if (size > 1048576){return (size/1048576).toFixed(2) + "Mb"}
    }


    return (
        <div>
             <h1>Upload avatar</h1> <br/>
             {/*<pre>{fileTXT}</pre>*/}

            <Button
                    type={'reset'}
                    onClick={() => buttonRef && buttonRef.current && buttonRef.current.click() }
                    variant={'contained'}
                    color={'primary'}>
                    Upload
            </Button>

            { file &&
             <div>
                 <br/>
                <div>
                    <img style={{width: 150, borderRadius: 20}} src={file64}/>
                </div>
                <div><h3>File info:</h3></div>
                <div>name: {file && file.name}</div>
                <div>lastModified: {file && file.lastModified}</div>
                <div>size: {file && returnFileSize(file.size)}</div>
                <div>type: {file && file.type}</div>
             </div>
             }

                <div>
                    <input type="file"
                    ref={buttonRef}
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={upLoad}
                    style={{display:"none"}}
                    />
                </div>

        </div>
    );
}
