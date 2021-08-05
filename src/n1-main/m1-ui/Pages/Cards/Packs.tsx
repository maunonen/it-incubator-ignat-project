import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Maximize } from '@material-ui/icons';
import { maxHeaderSize } from 'http';
import RangeShowCard from './RangeShowCard';
import PackList from './PacksList'




const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 5,
    margin: 20,
    height: 600,
    backgroundColor: "#988cd4"
      },

}));

export default function Cards() {
  const classes = useStyles();

  return (
          <div>

            <Grid container direction="row"  justifyContent="center" alignItems="stretch" className={classes.root}>

                <Grid item xs={8} >
                   <PackList/>
                </Grid>

            </Grid>

          </div>
  );
}
