import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import RangeSlider from './RangeSlider' ;
import Typography from '@material-ui/core/Typography';
import {ButtonGroup} from "@material-ui/core";


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

export default function CenteredGrid() {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container>
                <Typography
                    variant="h3"
                    className={classes.privateModeHeader}
                >
                    Show pack cards
                </Typography>
                {/*<Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >*/}
                <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="small outlined secondary button group"
                    /*aria-label="outlined primary button group"*/
                    className={classes.privateModeBlock}
                >
                    <Button
                        className={classes.modeButton}
                    >My</Button>
                    <Button
                        className={classes.modeButton}
                    >ALl</Button>
                </ButtonGroup>
                {/*<Button variant="contained" color="primary">
                    My
                  </Button>
                  <Button variant="contained" color="secondary">
                    All
                  </Button>*/}
                {/*</Grid>*/}
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
