import React, {useEffect, useState} from 'react'
import {Button, Card, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {
    GetPackQueryParamsType, NewPackFieldsType,
    NewPackObjectDataType,
    PackUpdateFieldsType,
    PackUpdateObjectType
} from "../../m3-dal/Api";
import {
    addNewPackTC,
    deletePackByIdTC,
    getAllPack,
    setCardsPackAC, setCardsPackTotalCountAC,
    setMaxCardsCountAC,
    setMinCardsCountAC,
    setPackNameAC, setPackSortType, setPageAC,
    setPageCountAC,
    setUserIdAC, updateCardPack
} from "../../m2-bll/redux/pack-reducer";
import Table from "../common/c8-Table/Table";
import DeckTable from "../common/c8-Table/DeckTable";

const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        /*maxWidth: "413px",*/
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
    const [name, setName] = useState<string>('first deck updated')
    const [path, setPath] = useState<string>('')
    const [grade, setGrade] = useState<number>(0)
    const [shots, setShots] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)
    const [deckCover, setDeckCover] = useState<string>('')
    const [privateDeck, setPrivateDeck] = useState<boolean>(false)

    /*type? : string
    name? : string
    path? : string
    grade? : number
    shots? : number
    rating? : number
    deckCover? : string
    private? : boolean*/

    const getAllPacks = () => {
        dispatch(getAllPack())
    }

    const deletePackById = () => {
        let id = "610a4f0684e42f00045c32e5";
        dispatch(deletePackByIdTC(id))
    }

    const updatePack = () => {
        let _id = '610a53b49906843f45c0f280';
        let updatePackObject: PackUpdateFieldsType = {
            ...(name && {name: name}),
            ...(path && {path: path}),
            ...(grade && {grade: grade}),
            ...(shots && {shots: shots}),
            ...(rating && {rating: rating}),
            ...(deckCover && {deckCover: deckCover}),
            /*...( privateDeck && { private: privateDeck}),*/
            ...(type && {typeDeck: type}),
        }
        dispatch(updateCardPack(_id, updatePackObject))
    }

    const addPack = () => {
        let newPackObject: NewPackFieldsType = {
            ...(name && {name: name}),
            ...(path && {path: path}),
            ...(grade && {grade: grade}),
            ...(shots && {shots: shots}),
            ...(rating && {rating: rating}),
            ...(deckCover && {deckCover: deckCover}),
            /*...( privateDeck && { private: privateDeck}),*/
            ...(type && {typeDeck: type}),
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
                    {/*<Button
                        type={'button'}
                        variant={'contained'}
                        onClick={getAllPacks}
                        color={'primary'}>GetPacks</Button>*/}
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
                    <Button
                        type={'button'}
                        variant={'contained'}
                        onClick={updatePack}
                        color={'primary'}>Update pack</Button>
                    {/*<Table/>*/}
                </Grid>
                <Grid item>
                    <DeckTable/>
                </Grid>
            </Card>

        </Grid>
    )
}

export default PacksListPage