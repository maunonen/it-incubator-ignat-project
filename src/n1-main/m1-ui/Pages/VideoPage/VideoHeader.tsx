import React from 'react'
import {NavLink, useHistory, useParams} from 'react-router-dom'
import {PATH} from "../VideoPage/VideoRoutes";
import {AppBar, Button, createStyles, makeStyles, Theme, Toolbar} from "@material-ui/core";


const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        backgroundColor: "#EBE0E9",

    },
    listBlock : {
        display : "flex",
        flexDirection: "row"
    },
    iconBlock : {
    },
    menuItem: {
        color: "#2D2E46",
    }
}))

const VideoHeader: React.FC = () => {
    const history = useHistory()
    const classes = useStyles()

    return (
        <div>
            <AppBar
                position="static"
                className={classes.root}
            >
                <Toolbar>
                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.MY_VIDEO)}
                        >My Video</Button>

                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.YOUTUBE_VIDEO)}
                        >YOUTUBE video</Button>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default VideoHeader
