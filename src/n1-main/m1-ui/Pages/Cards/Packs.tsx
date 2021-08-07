import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Maximize} from '@material-ui/icons';
import {maxHeaderSize} from 'http';
import RangeShowCard from './RangeShowCard';
import PackList from './PacksList'
import {Button} from "@material-ui/core";
import {acsessAPI} from "../../../m3-dal/Api";


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

    const getAllCards = () => {
        const queryObject = {
            params: {
                cardsPack_id: '610a8f3184e42f00045c32e9'
            }
        }
        acsessAPI.getAllCards(queryObject);

    }
    const addNewCard = () => {
        const newCardObject =   {
            card: {
                cardsPack_id: "610a8f3184e42f00045c32e9",
                question: "Question test add new card",
                answer: "Answer for test add neew card",
            }
        }
        acsessAPI.postCard(newCardObject)
    }
    const updateNewCard = () => {
        const updateObject = {
            card: {
                _id: '610e8a1d635aff7419465597',
                question: 'some updates Test API',
                answer: 'some updates Test API',
            }
        }
        acsessAPI.updateCardById(updateObject)
    }
    const deleteNewCard = () => {
        const cardId = "610e8a1d635aff7419465597";
        acsessAPI.deleteCardByID(cardId)
    }

    return (
        <div>
            <Grid container direction="row" justifyContent="center" alignItems="stretch" className={classes.root}>
                <Grid item xs={8}>
                    <Button onClick={getAllCards}>Get all cards</Button>
                    <Button onClick={addNewCard}>Add new card</Button>
                    <Button onClick={updateNewCard}>Update card</Button>
                    <Button onClick={deleteNewCard}>Delete new card</Button>
                    <PackList/>
                </Grid>
            </Grid>
        </div>
    );
}
