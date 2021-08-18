import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Button, IconButton, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardTable from "./CardTable";
import SearchCard from './SearchCard';
import {Redirect, useHistory, useParams} from "react-router-dom";
import {PATH} from "../../Routes";
import {ArrowBackIos} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "40px",
        marginBottom: "40px",
        maxWidth: 1200,
        margin: 'auto',
    },
    paper: {
        padding: '25px',
    },

    mainBlock: {
        width: "fit-content",
        margin: "30px",
        boxSizing: "border-box",
    },
    mainSearchBlock: {
        marginBottom: "20px",
    },
    mainSearchHeader: {
        marginBottom: "20px",
    },
    mainTableBlock: {
        /*maxWidth: "500px",*/
    }
}));

const CardPage: React.FC = () => {
    const classes = useStyles();
    const {packId} = useParams<{ packId: string }>()
    const history = useHistory()
    const {cardPacks} = useSelector((state: AppStoreType) => state.pack)

    const packName = () => {
        if (cardPacks.length > 0 && packId) {
            const packObjectFromState = cardPacks.find(pack => pack._id === packId)
            const getObjectName: string | undefined = packObjectFromState?.name;
            if (getObjectName) {
                return getObjectName?.length > 20 ? getObjectName.slice(0, 20) + '...' : getObjectName
            }
        }
    }


    return (
        <div className={classes.root}>
            <Paper
                elevation={4}
                className={classes.paper}
                square={false}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >

                    <Grid
                        item
                        className={classes.mainSearchBlock}
                        alignItems={"stretch"}
                    >
                        {/*<Button
                            color="inherit"
                            style={{ display  : "inline-block"}}
                            onClick={() => <Redirect to={PATH.TEST_PAGE}/>}>
                            Back</Button>*/}

                        <Typography
                            variant={"h2"}
                            className={classes.mainSearchHeader}
                        >
                            <IconButton
                                onClick={() => {
                                    history.push(PATH.PACK)
                                }}
                            >
                                <ArrowBackIos/>
                            </IconButton>
                            {(packName && packName()) || 'PackName'}
                        </Typography>
                        <SearchCard packId={packId}/>
                    </Grid>
                    <Grid
                        item
                        className={classes.mainTableBlock}
                    >
                        <CardTable/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default CardPage