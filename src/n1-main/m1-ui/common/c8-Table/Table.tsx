import React from 'react'
import {Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import LoadingIcon from "../icons/LoadingIcon";


const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        /*textAlign: "center",
        padding: "30px 30px",
        maxWidth: "413px",*/
    },
}))

export type TablePropsType = {
    /*message?: string*/
}

const Table: React.FC<TablePropsType> = (props) => {

    const classes = useStyles()
    /*const {message} = props*/

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{minHeight: '100vh'}}
        >
            <Card
                className={classes.root}
            >
                <Grid item>
                   Table
                </Grid>
            </Card>
        </Grid>
    )
}

export default Table