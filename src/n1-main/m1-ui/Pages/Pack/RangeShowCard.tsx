import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RangeSlider from './RangeSlider' ;
import Typography from '@material-ui/core/Typography';
import RangeButtons from "./RangeButtons";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    privateModeHeader : {
        marginBottom : "20px",
    },
    privateModeBlock : {
        display: "flex",
        alignItems: "stretch",
        marginBottom : "40px",
    },
    modeButton : {
        padding: "8px 32px",
        borderRadius: "0px",
        textAlign: "center",
    },
    paper: {
        /*padding: theme.spacing(1),*/
        /*textAlign: 'left',*/
        /*color: theme.palette.text.secondary,*/
        /*height: 600,*/
        /*backgroundColor: "#e2dfef"*/
    },
    sliderCaption: {
        marginBottom : "40px",
        /*padding: theme.spacing(6),*/
        /*textAlign: 'center',*/
    },
}));

export default function RangeShowCard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <RangeButtons/>
                <Typography
                    variant="h3"
                    gutterBottom
                    className={classes.sliderCaption}
                >
                    Number of cards
                </Typography>
                <RangeSlider/>
            </Grid>
        </div>
    );
}
