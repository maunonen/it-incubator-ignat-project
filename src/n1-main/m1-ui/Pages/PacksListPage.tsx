import React, {useEffect} from 'react'
import {Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {GetPackQueryParamsType} from "../../m3-dal/Api";
import {
    setCardsPackAC, setCardsPackTotalCountAC,
    setMaxCardsCountAC,
    setMinCardsCountAC,
    setPackNameAC, setPackSortType, setPageAC,
    setPageCountAC,
    setUserIdAC
} from "../../m2-bll/redux/pack-reducer";

const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        maxWidth: "413px",
    },

}))

export type PackListPagePropsType = {
    message?: string
}

const PacksListPage: React.FC<PackListPagePropsType> = (props) => {

    const classes = useStyles()
    const {message} = props
    const dispatch = useDispatch()
    const pack = useSelector( (state : AppStoreType) => state.pack)

    /*dispatch(setPackNameAC('some test'))
    dispatch(setMinCardsCountAC(3))
    dispatch(setMaxCardsCountAC(7))
    dispatch(setUserIdAC('user_id--vsvs'))
    dispatch(setPageCountAC(89))
    dispatch(setPageAC(4))
    dispatch(setCardsPackAC([]))
    dispatch(setCardsPackTotalCountAC(89))
    dispatch(setPackSortType(true, 'created'))*/

    useEffect(() => {

        const paramsObject : GetPackQueryParamsType = {
            params : {
                ...( pack.packName && {packName: pack.packName}),
                ...( pack.min && {min: pack.min}),
                ...( pack.max && {max: pack.max}),
                ...( pack.page && {page: pack.page}),
                ...( pack.pageCount && {pageCount: pack.pageCount}),
                ...( pack.user_id && {user_id: pack.user_id}),
            }
        }
        console.log(paramsObject)
    }, [])

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
                    PackListPage
                </Grid>
            </Card>
        </Grid>
    )
}

export default PacksListPage