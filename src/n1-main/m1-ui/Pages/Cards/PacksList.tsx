import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {TextField,Button} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { maxHeaderSize } from 'http';
import Search from './Search' ;
import Table from './Table';
import Pagination from './Pagination';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: 32,
      },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

          <Grid container direction="row" justifyContent="center" alignItems="center" >

            <Grid container direction="column" justifyContent="center" alignItems="center" >
                <Typography variant="h6" gutterBottom>
                    Cards list
                </Typography>

            </Grid>

            <Grid item xs={12} className={classes.root} >
                <Table/>
            </Grid>

            <Pagination/>

          </Grid>

    </div>
  );
}
