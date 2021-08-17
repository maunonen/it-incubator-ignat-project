import React, {useState} from 'react'
import TableCell from "@material-ui/core/TableCell";
import moment from "moment";
import {Button, createStyles} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import {CardType, UpdateCardFieldsType} from "../../../m3-dal/Api";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";
import ModalForm from "../../common/c9-Modal/ModalForm";
import {deleteCardByIdTC, updateCardTC} from "../../../m2-bll/redux/card-reducer";
import TextField from "@material-ui/core/TextField";
import {setFlagsFromString} from "v8";
import {updateCardPack} from "../../../m2-bll/redux/pack-reducer";
import {setAppErrorAC} from "../../../m2-bll/redux/app-reducer";

export interface CardTableRowPropsType {
    card: CardType
    labelId: string
    packId: string
    closeAfterAction?: boolean
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {},
        tableRow: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
)


const CardTableRow: React.FC<CardTableRowPropsType> = (props) => {
    const {card, labelId, packId} = props;
    const classes = useStyles();
    const {_id} = useSelector((state: AppStoreType) => state.auth)
    const dispatch = useDispatch()
    const [modalDeleteStatus, setModalDeleteStatus] = useState(false)
    const [modalEditStatus, setModalEditStatus] = useState(false)

    const [question, setQuestion] = useState<string | null>(null)
    const [answer, setAnswer] = useState<string | null>(null)

    const handleDeleteCard = (cardId: string, packId: string) => {
        if (cardId) {
            dispatch(deleteCardByIdTC(cardId, packId))
        }
    }
    const handleEditCard = (cardId: string) => {
        /*if (!(question && answer)) {
            dispatch(setAppErrorAC('Please provide Question and answer'))
            return
        }*/
        const cardUpdateCard: UpdateCardFieldsType = {
            ...(question && {question}),
            ...(answer && {answer}),
        }
        dispatch(updateCardTC(cardId, packId, cardUpdateCard))
        setAnswer(null)
        setQuestion(null)
    }
    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value)
    }
    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value)
    }

    return (
        <TableRow
            /*hover*/
            /*onClick={(event) => handleClick(event, pack.name)}*/
            role="checkbox"
            /*aria-checked={isItemSelected}*/
            tabIndex={-1}
            /*selected={isItemSelected}*/
            className={classes.tableRow}
        >
            <TableCell component="th" id={labelId} scope="row" padding="normal">
                {card.question.length > 20 ? card.question.slice(0, 20) + '...' : card.question}
            </TableCell>
            <TableCell align="left">
                {card.answer.length > 20 ? card.answer.slice(0, 20) + '...' : card.answer}
            </TableCell>
            <TableCell
                align="right">{moment(card.updated).format("DD.MM.YYYY")}
            </TableCell>
            <TableCell align="right">{card.grade}</TableCell>
            {
                card.user_id === _id &&
                <>
                    <Button
                        onClick={() => {
                            setModalDeleteStatus(true)
                        }}>Delete</Button>
                    <Button
                        onClick={() => {
                            setModalEditStatus(true)
                        }}>Edit</Button>
                    <ModalForm
                        modalTitle={"Delete Card"}
                        modalText={"Do you really want to delete card"}
                        openStatus={modalDeleteStatus}
                        handleCloseModal={setModalDeleteStatus}
                        modalActionCallback={() => {
                            handleDeleteCard(card._id, packId)
                        }}
                        actionButtonTitle={"Delete"}
                    />
                    <ModalForm
                        modalTitle={"Edit Pack"}
                        actionButtonTitle={"Edit"}
                        openStatus={modalEditStatus}
                        handleCloseModal={setModalEditStatus}
                        modalActionCallback={() => {
                            handleEditCard(card._id)
                        }}
                    >
                        <>
                            <TextField
                                value={question === null ? card.question : question}
                                onChange={handleQuestionChange}
                                margin="dense"
                                id="question"
                                label="Question"
                                type="string"
                                fullWidth
                            />
                            <TextField
                                value={answer === null ? card.answer : answer}
                                onChange={handleAnswerChange}
                                margin="dense"
                                id="answer"
                                label="Answer"
                                type="string"
                                fullWidth
                            />
                        </>
                    </ModalForm>
                </>
            }
        </TableRow>
    )

}

export default CardTableRow
