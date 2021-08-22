import React, {ChangeEvent, useRef, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        paper1:{
            width: "auto",
            height: 200,
            display: 'flex',
        },
        paper2:{
            width: 400,
            height: 200,
            display: 'flex',
        },
    }),
);


interface IFileInputProps {
}

const ReadFiles: React.FC<IFileInputProps> = () => {


    const classes = useStyles();

    const buttonRef=useRef<HTMLInputElement>(null)

    const [file64, setFile64] = useState<string>();
    const [existFile, setExistFile] = useState<string>("copyRight");

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        const reader = new FileReader();

        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            reader.onloadend = () => {
                setFile64(reader.result+""); // transformation to string (same String(value))
            };
            reader.readAsText(newFile)
        }
    };

    const writeFile = (fileName: string, value: string) => {
        const link = document.createElement("a");
        link.href = "data:text/plain;content-disposition=attachment;filename=file," + value;
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{display: "flex"}} >

                <Grid
                    className={classes.root}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <div>
                        <h3>Upload file and edit and save</h3>
                        <input
                            ref={buttonRef}
                            type={'file'}
                            accept=".txt" multiple
                            onChange={upload}
                            style={{display:"none"}}
                        />
                        <Button
                            type={'reset'}
                            onClick={() => buttonRef && buttonRef.current && buttonRef.current.click() }
                            variant={'contained'}
                            color={'primary'}>
                            upload
                        </Button>
                        <Button
                            type={'reset'}
                            onClick={() => writeFile('Text.txt', file64 + `\r\n` + existFile) }
                            variant={'contained'}
                            color={'primary'}>
                            Save
                        </Button>
                    </div>
                    <div>
                        <Paper className={classes.paper2} elevation={3}>
                                <textarea style={{width: 600}} value={file64} onChange={e => setFile64(e.currentTarget.value)}/>
                            {/*<pre>{file64}</pre>*/}

                        </Paper>
                    </div>
                </Grid>
                <br/>
        </div>
    );
};

export default ReadFiles;
