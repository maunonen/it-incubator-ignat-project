import React, {useEffect} from 'react'
import {Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import LoadingIcon from "../icons/LoadingIcon";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";


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
    const pack = useSelector((state: AppStoreType) => state.pack)

    return (
        <>
            <p>Max : {pack.max}</p>
            <p>Min : {pack.min}</p>
            <p>Page : {pack.page}</p>
            <p>Page count : {pack.pageCount}</p>

        Packs : {pack.cardPacks.map(pack => <p>{pack.name}</p>)}
        </>
    )
}

export default Table