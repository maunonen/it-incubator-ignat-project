import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RangeShowCard from './RangeShowCard';
import PackList from './PacksList'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";
import {UserProfileType} from "../../../m2-bll/redux/profile-reducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../Routes";
import { getAllPack } from "../../../m2-bll/redux/pack-reducer";
import {GetPackQueryParamsType} from "../../../m3-dal/Api";



const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        backgroundColor: "#988cd4"
    },

}));

export default function Pack() {
    const classes = useStyles();

    const userProfile = useSelector<AppStoreType, UserProfileType>(state => state.profile);
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


    if (!userProfile._id) {
        return (
            <Redirect from={PATH.ALL_ROUTES} to="/login"/>
        )
    }


    return (
        <div>

            <Grid container direction="row" justifyContent="center" alignItems="stretch" className={classes.root}>

                <RangeShowCard/>

                <Grid item xs={8}>
                    <PackList/>
                </Grid>

            </Grid>

        </div>
    );
}
