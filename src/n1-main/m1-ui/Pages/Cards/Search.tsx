import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            flexGrow: 1,
        },
        search: {
            width: 500,
            marginRight: 40,
            backgroundColor: "#e2dfef"
        },
    }),
);

export default function FullWidthGrid() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [value, setValue] = React.useState('');

    const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const buttonClickHandler = () => {
        alert(value + " запрос на поиск колоды")
        // dispatch(ignatBackRequest(value))
        };


    return (
        <div className={classes.rootGrid}>
            <Grid  container direction="row" justifyContent="center" alignItems="center">
                    <TextField
                        className={classes.search}
                        id="outlined-textarea"
                        label="Search"
                        placeholder="Input list name"
                        multiline
                        variant="outlined"
                        onChange={inputHandleChange}
                    />
                    <Button variant="contained" color="primary"
                            onClick={buttonClickHandler} >
                        Add new pack
                    </Button>
            </Grid>
        </div>
    );
}
