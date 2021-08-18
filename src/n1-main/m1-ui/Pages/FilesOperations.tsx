
import React, {ChangeEvent, useRef} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Button } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import { fileURLToPath } from 'url';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            margin: theme.spacing(2, 0),
        },
    }),
);

export default function FilesOperations() {
    const classes = useStyles();

        const myRef=useRef<HTMLInputElement>(null) 
        const [file,setFile]=useState<any>()
        const [file64,setFileURL]=useState<any>({})
        const [fileTXT,setFile64]=useState<any>({})

        const upLoad=(e:ChangeEvent<HTMLInputElement>)=>{
            const newFile= e.target.files && e.target.files[0]
            // const reader = new FileReader() 
            
            if (newFile){setFile(newFile)
                setFileURL(window.URL.createObjectURL(newFile))
                // save in function.options what we read in file
                // reader.onloadend =()=>{setFile64(reader.result)} 
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
            {/* <pre>{fileTXT}</pre> */}
            
            <Button
                    type={'reset'}
                    onClick={() => myRef && myRef.current && myRef.current.click() }
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
                    ref={myRef}
                    accept=".jpg,.txt"
                    multiple 
                    onChange={upLoad}
                    style={{display:"none"}}
                    />                 
                </div>
        </div>
    );
}
