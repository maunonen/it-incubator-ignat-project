import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Maximize} from '@material-ui/icons';
import {maxHeaderSize} from 'http';
import RangeShowCard from './RangeShowCard';
import PackList from './PacksList'
import {Button} from "@material-ui/core";
import {acsessAPI, PostCardFieldsType, UpdateCardFieldsType} from "../../../m3-dal/Api";
import {useDispatch, useSelector} from "react-redux";
import {addNewCardTC, deleteCardByIdTC, getAllCardsTS, updateCardTC} from "../../../m2-bll/redux/card-reducer";
import {AppStoreType} from "../../../m2-bll/redux/store";


const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 5,
        margin: 20,
        height: 600,
        backgroundColor: "#988cd4"
    },

}));

export default function Cards() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {cards, cardsTotalCount} = useSelector((state: AppStoreType) => state.card)

    console.log('cardsTotalCount', cardsTotalCount)
    console.log('cards thunk', cards)
    const getAllCards = () => {
        dispatch(getAllCardsTS("610a8f3184e42f00045c32e9"))
        /*const queryObject = {
            params: {
                cardsPack_id: '610a8f3184e42f00045c32e9'
            }
        }
        acsessAPI.getAllCards(queryObject);*/

    }
    const addNewCard = () => {
        const packId = "610a8f3184e42f00045c32e9";
        const newCardObject : PostCardFieldsType = {
                question: "Question test add new card",
                answer: "Answer for test add neew card",
        }
        /*acsessAPI.postCard(newCardObject)*/
        dispatch(addNewCardTC( packId, newCardObject))
    }
    const updateNewCard = () => {
        console.log("update thunk test")
        const updateObject : UpdateCardFieldsType = {
            question: 'Test from component 2',
            answer: 'Test from component 2',
        }
        const _id = '610f9b6d635aff741946559a';
        /*dispatch(updateCardTC(_id, updateObject))*/
        /*acsessAPI.updateCardById(updateObject)*/
    }
    const deleteNewCard = () => {
        const cardId = "610f909322821e00045fa7ce";
        /*dispatch(deleteCardByIdTC(cardId))*/
        /*acsessAPI.deleteCardByID(cardId)*/
    }

    return (
        <div>
            <Grid container direction="row" justifyContent="center" alignItems="stretch" className={classes.root}>
                <Grid item xs={8}>
                    <Button onClick={getAllCards}>Get all cards</Button>
                    <Button onClick={addNewCard}>Add new card</Button>
                    <Button onClick={updateNewCard}>Update card</Button>
                    <Button onClick={deleteNewCard}>Delete card</Button>
                    <PackList/>
                </Grid>
            </Grid>
        </div>
    );
}
