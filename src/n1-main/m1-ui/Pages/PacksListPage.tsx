import React, {useEffect, useState} from 'react'
import {Button, Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {GetPackQueryParamsType, NewPackObjectDataType} from "../../m3-dal/Api";
import {
    addNewPackTC,
    deletePackByIdTC,
    getAllPack,
    setCardsPackAC, setCardsPackTotalCountAC,
    setMaxCardsCountAC,
    setMinCardsCountAC,
    setPackNameAC, setPackSortType, setPageAC,
    setPageCountAC,
    setUserIdAC
} from "../../m2-bll/redux/pack-reducer";
import Table from "../common/c8-Table/Table";

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
    const pack = useSelector((state: AppStoreType) => state.pack)
    console.log('Render pack list page', pack)
    // new Pack Object Fields
    const [type, setType] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [grade, setGrade] = useState<number>(0)
    const [shots, setShots] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)
    const [deckCover, setDeckCover] = useState<string>('')
    const [privatePack, setPrivatePack] = useState<boolean>(false)

    /*type? : string
    name? : string
    path? : string
    grade? : number
    shots? : number
    rating? : number
    deckCover? : string
    private? : boolean*/

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
    }
    const deletePackById = () => {
        let id = "610952e52433800004e45c2e";
        dispatch(deletePackByIdTC(id))
    }

    let newObject= {
        cardsPack : {
            name : ''
        }
    }
    /*let name = 'name'*/
    const addPack = () => {
        let newPackObject: NewPackObjectDataType = {
            cardsPack: {
                /*...(newObject.cardsPack.name && { name: newObject.cardsPack.name}),*/
                ...(name && { name: name}),
            }
        }
        dispatch(addNewPackTC(newPackObject))
    }

    useEffect(() => {
        console.log('Pack reducer state', pack)

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
                    <Button
                        type={'button'}
                        variant={'contained'}
                        onClick={getAllPacks}
                        color={'primary'}>GetPacks</Button>
                    <Button
                        type={'button'}
                        variant={'contained'}
                        onClick={deletePackById}
                        color={'primary'}>Delete pack</Button>
                    <Button
                        type={'button'}
                        variant={'contained'}
                        onClick={addPack}
                        color={'primary'}>Add pack</Button>
                    <Table/>
                </Grid>
            </Card>
        </Grid>
    )
}

export default PacksListPage