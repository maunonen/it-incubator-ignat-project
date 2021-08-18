import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Button, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getAllCardsTS} from "../../../m2-bll/redux/card-reducer";
import {AppStoreType} from "../../../m2-bll/redux/store";
import {PATH} from "../../Routes";
import {useSpring, a} from '@react-spring/web'


const useStyles = makeStyles(() => ({
        root: {
            marginTop: "40px",
            marginBottom: "40px",
            minWidth: 350,
        },
        paper: {
            /*position: absolute;*/
            /*max-width: 500px;
            max-height: 500px;*/
            width: "350px",
            height: "200px",
            cursor: "pointer",
            willChange: "transform, opacity",
            /*will-change: transform, opacity;*/
            margin: 'auto',
            /*maxWidth: 500,
            padding: "30px",*/
        },
        /*.front,
        .back {
        background-size: cover;
        }*/
        front: {backgroundSize: "cover"},
        back: {backgroundSize: "cover"},
        buttonBlock: {}
    })
)

const LearnPage = () => {
    const classes = useStyles();
    const {packId} = useParams<{ packId: string }>();
    const dispatch = useDispatch();
    const [flipped, setFlipped] = useState(false)
    const {cards} = useSelector((state: AppStoreType) => state.card)
    const pack = useSelector((state: AppStoreType) => state.pack.cardPacks.find(pack => pack._id === packId))
    const [cardToLearn, setCardToLearn] = useState<number>(0)



    /*const handleFlip = () => {
        setFlipped((state) => !state)
    }*/

    useEffect(() => {
        if (packId) {
            dispatch(getAllCardsTS(packId))
        }
    }, [])


    const {transform, opacity} = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80},
    })

    return (
        <div className={classes.root}>
            <a.div
                //@ts-ignore
                style={{opacity: opacity.to(opacity => 1 - opacity), transform}}
                className={`${classes.paper} ${classes.front}`}
            >
                <Paper
                    elevation={4}
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
                            /*className={classes.filterBlock}*/
                        >
                            <Typography variant={"h1"}>
                                {pack && pack.name}
                            </Typography>
                            {cards.length > 0 &&
                            <Typography variant={"body1"}>{cards[cardToLearn].question}</Typography>}
                            <div className={classes.buttonBlock}>
                                <Button
                                    type={'reset'}
                                    variant={'contained'}
                                    /*className={classes.formButtonBlock}*/
                                    color={'primary'}
                                    component={NavLink}
                                    to={PATH.PACK}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    onClick={() => setFlipped(state => !state)}
                                    color={'primary'}>
                                    Show answer
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </a.div>
            <a.div
                //@ts-ignore
                className={`${classes.paper} ${classes.back}`}
                style={{opacity, transform, rotateX: '180deg',}}
            >
                <Paper
                    elevation={4}
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
                            /*className={classes.filterBlock}*/
                        >
                            <Typography variant={"h1"}>
                                {pack && pack.name}
                            </Typography>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                onClick={() => setFlipped(state => !state)}
                                color={'primary'}>
                                Flip
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </a.div>
        </div>
    )
}

export default LearnPage