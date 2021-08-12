import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import RangeSlider from './RangeSlider' ;
import Typography from '@material-ui/core/Typography';
import {getAllPack, setUserIdAC} from "../../../m2-bll/redux/pack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";
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

    const pack = useSelector((state: AppStoreType) => state.pack);

    const dispatch = useDispatch();

    const myButtonClickHandler=()=>{
        dispatch (setUserIdAC("6113f19767851c0004b0d0d4"))
        dispatch(getAllPack())
    };
    const allButtonClickHandler=()=>{
        dispatch (setUserIdAC(""))
        dispatch(getAllPack())
    };


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
