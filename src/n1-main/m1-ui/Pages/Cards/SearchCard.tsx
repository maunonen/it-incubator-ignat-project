import React, {KeyboardEventHandler, useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {addNewPackTC, setPackNameAC} from "../../../m2-bll/redux/pack-reducer";
import {NewPackFieldsType, NewPackObjectDataType, PostCardFieldsType} from "../../../m3-dal/Api";
import {addNewCardTC, getAllCardsTS} from "../../../m2-bll/redux/card-reducer";
import {AppStoreType} from "../../../m2-bll/redux/store";
import ModalForm from "../../common/c9-Modal/ModalForm";
import {setAppErrorAC} from "../../../m2-bll/redux/app-reducer";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            flexGrow: 1,
        },
        search: {
            display: "flex",
            alignItems: "stretch",
            /*marginRight: 40,*/
            backgroundColor: "#e2dfef"
        },
        searchInputBlock: {
            flexGrow: 3,
        },
        addDeckBlock: {
            marginLeft: "20px",
        }
    }),
);

export interface SearchCardPropsType {
    packId: string
}

const SearchCard: React.FC<SearchCardPropsType> = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {packUserId} = useSelector((state: AppStoreType) => state.card)
    const [search, setSearch] = React.useState<string>('');
    const {_id} = useSelector((state: AppStoreType) => state.auth);
    const [modalAddStatus, setModalCardStatus] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string | null>(null);
    const [question, setQuestion] = useState<string | null>(null);

    const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const onChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value)
    }
    const onChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value)
    }

    const handleAddCard = () => {
        // Create new Card object from local state
        const newCardObject: PostCardFieldsType = {
            ...(question !== null && {question}),
            ...(answer !== null && {answer}),
        }
        if (question && answer) {
            dispatch(addNewCardTC(props.packId, newCardObject))
            setQuestion(null)
            setAnswer(null)
        } else {
            dispatch(setAppErrorAC("Please provide answer and question"))
        }
    }

    return (
        <div
            className={classes.rootGrid}
        >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <Grid
                    item
                    className={classes.searchInputBlock}
                >
                    <TextField
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="Search"
                        placeholder="Input list name"
                        variant="outlined"
                        onChange={inputHandleChange}
                        /*onKeyDown={handlePressEnter}*/
                        onKeyUp={(event) => {
                            console.log('Event', event)
                            if (event.key === 'Enter') {
                                /*if (!search) {
                                    dispatch(getAllCardsTS(props.packId, { cardQuestion : search}))
                                }*/
                                dispatch(getAllCardsTS(props.packId, {cardQuestion: search}))
                                setSearch('');
                            }
                        }}
                    />
                </Grid>
                {
                    packUserId === _id &&
                    <Grid
                        item
                        className={classes.addDeckBlock}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setModalCardStatus(true)
                            }}
                        >
                            Add new pack
                        </Button>
                    </Grid>
                }
            </Grid>
            <ModalForm
                modalTitle={"Add Card"}
                modalText={"Please specify answer and question"}
                openStatus={modalAddStatus}
                handleCloseModal={setModalCardStatus}
                modalActionCallback={() => {
                    handleAddCard()
                }}
                actionButtonTitle={"Add pack"}
            >
                <div>
                    <TextField
                        value={answer}
                        onChange={onChangeAnswer}
                        margin="dense"
                        id="answer"
                        label="Answer"
                        type="string"
                        fullWidth
                    />
                    <TextField
                        value={question}
                        onChange={onChangeQuestion}
                        margin="dense"
                        id="question"
                        label="Question"
                        type="string"
                        fullWidth
                    />
                </div>
            </ModalForm>
        </div>
    );
}

export default SearchCard