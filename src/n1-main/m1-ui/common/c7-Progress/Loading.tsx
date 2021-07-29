import React from 'react'
import {Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import LoadingIcon from "../icons/LoadingIcon";


const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        maxWidth: "413px",
    },
    loadingTitle : {
        margin: "30px 40px"
    },
    loadingMessage : {
        margin: "30px 40px"
    }
}))

export type LoadingPropsType = {
    message?: string
}

const Loading: React.FC<LoadingPropsType> = (props) => {

    const classes = useStyles()
    const {message} = props

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
                    <Typography
                        variant={"h1"}
                        className={classes.loadingTitle}
                    >It-incubator</Typography>
                    <LoadingIcon size={"100px"}/>
                    {
                        message &&
                        <Typography
                            variant={"body1"}
                            className={classes.loadingMessage}
                        >
                            {message}
                        </Typography>}
                </Grid>
            </Card>
        </Grid>
    )
}

export default Loading