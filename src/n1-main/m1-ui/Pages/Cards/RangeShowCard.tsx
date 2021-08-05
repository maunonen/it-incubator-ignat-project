import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import RangeSlider from './RangeSlider' ;
import Typography from '@material-ui/core/Typography';


import { Maximize } from '@material-ui/icons';
import { maxHeaderSize } from 'http';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
      },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 600,
    backgroundColor: "#e2dfef"
  },
  sliderName: {
    padding: theme.spacing(6),
    textAlign: 'center',
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
        
      <Grid container  >         
        <Paper className={classes.paper} >
             
             <Grid container direction="column" justifyContent="center" alignItems="center" >

                <Typography variant="h2" gutterBottom>  
                   Show pack cards
                </Typography>

                <Grid container direction="row" justifyContent="space-evenly" alignItems="center" >
                  <Button variant="contained" color="primary">
                    My
                  </Button>
                  <Button variant="contained" color="secondary">
                    All
                  </Button>
                </Grid> 

                <Typography variant="h2" gutterBottom className={classes.sliderName}>
                   Number of cards
                </Typography>
                                     
                <RangeSlider/>
           
            </Grid>         
        </Paper>           
      </Grid>

    </div>
  );
}
