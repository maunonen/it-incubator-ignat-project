import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Maximize } from '@material-ui/icons';
import { maxHeaderSize } from 'http';
import RangeShowCard from './RangeShowCard';
import PackList from './PacksList'
import { green } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 5,
    margin: 20,
    height: 600,
    backgroundColor: "#988cd4"
      },

}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
          <div>
              
            <Grid container direction="row"  justifyContent="center" alignItems="stretch" className={classes.root}>   
                                    
                <RangeShowCard/>
              
                <Grid item xs={8} >
                   <PackList/>
                </Grid>
            
            </Grid>

          </div>
  );
}
