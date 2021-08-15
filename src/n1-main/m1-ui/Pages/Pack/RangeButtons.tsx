import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import {ButtonGroup} from "@material-ui/core";
import {getAllPack, setUserIdAC} from "../../../m2-bll/redux/pack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";
import {UserProfileType} from "../../../m3-dal/Api";


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

export default function RangeButtons() {
    const classes = useStyles();

    const pack = useSelector((state: AppStoreType) => state.pack);
    const [hint, setHint] = React.useState<string>("Only my cards are displayed");
    const userProfile = useSelector<AppStoreType, UserProfileType>(state => state.auth)

    const dispatch = useDispatch();

    const myButtonClickHandler=()=>{
        dispatch (setUserIdAC(userProfile._id))
        dispatch(getAllPack())
        setHint("Only my cards are displayed")
    };
    const allButtonClickHandler=()=>{
        dispatch (setUserIdAC(""))
        dispatch(getAllPack())
        setHint("All cards are displayed")
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Typography
                    variant="h3"
                    className={classes.privateModeHeader}
                >
                    Show pack cards
                </Typography>
                <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="small outlined secondary button group"
                    /*aria-label="outlined primary button group"*/
                    className={classes.privateModeBlock}
                >
                    <Button onClick={myButtonClickHandler}
                        className={classes.modeButton}
                    >My</Button>
                    <Button onClick={allButtonClickHandler}
                        className={classes.modeButton}
                    >ALL</Button>
                </ButtonGroup>
                <Typography
                    variant="h3"
                    className={classes.privateModeHeader}
                >
                    {hint}
                </Typography>
            </Grid>
        </div>
    );
}
