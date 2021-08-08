import React, {useCallback, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RangeShowCard from './RangeShowCard';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../Routes";
import {getAllPack} from "../../../m2-bll/redux/pack-reducer";
import {GetPackQueryParamsType, UserProfileType} from "../../../m3-dal/Api";
import {Card, Paper} from "@material-ui/core";
import DeckTable from "../../common/c8-Table/DeckTable";
import Search from './Search';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "40px",
    },
    paper: {
        margin: 'auto',
        maxWidth: 1200,
    },
    filterBlock: {
        backgroundColor: "#ECECF9",
        maxWidth: "250px",
        padding: "30px",
        flexGrow: 1,
    },
    mainBlock: {
        width: "fit-content",
        flexGrow: 3,
        margin: "30px",
        maxWidth: "950px",
        boxSizing : "border-box",
    },
    mainSearchBlock: {
        /*flexGrow: 1,*/
        marginBottom: "20px",
    },
    mainSearchHeader : {
        marginBottom: "20px",
    },
    mainTableBlock: {
        /*maxWidth: "500px",*/
    }
}));

export default function Pack() {
    const classes = useStyles();

    const {_id} = useSelector((state: AppStoreType) => state.auth);
    const pack = useSelector((state: AppStoreType) => state.pack);
    const dispatch = useDispatch();

    const getAllPacks = () => {
        let sortPacks
        if (pack.sortField) {
            sortPacks = +pack.isSortTypeAscending + pack.sortField;
        }

        const paramsObject: GetPackQueryParamsType = {
            params: {
                ...(pack.packName && {packName: pack.packName}),
                ...(pack.min && {min: pack.min}),
                ...(pack.max && {max: pack.max}),
                ...(pack.page && {page: pack.page}),
                ...(pack.pageCount && {pageCount: pack.pageCount}),
                ...(pack.user_id && {user_id: pack.user_id}),
                ...(sortPacks && {sortPacks: sortPacks}),
            }
        }
        dispatch(getAllPack(paramsObject))
    };

    useEffect(() => {
        getAllPacks();
    }, []);


    /*if (!_id) {
        return (
            <Redirect from={PATH.ALL_ROUTES} to="/login"/>
        )
    }*/


    return (
        <div className={classes.root}>

            <Paper
                elevation={4}
                className={classes.paper}
                square={false}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    <Grid
                        item
                        className={classes.filterBlock}
                    >
                        <RangeShowCard/>
                    </Grid>
                    <Grid
                        item
                        className={classes.mainBlock}
                    >
                        <Grid
                            item
                            className={classes.mainSearchBlock}
                            alignItems={"stretch"}
                        >
                            <Typography
                                variant={"h2"}
                                className={classes.mainSearchHeader}
                            >
                                Packs list
                            </Typography>
                            <Search/>
                        </Grid>
                        <Grid
                            item
                            className={classes.mainTableBlock}
                            alignItems={"stretch"}
                        >
                            <DeckTable/>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
