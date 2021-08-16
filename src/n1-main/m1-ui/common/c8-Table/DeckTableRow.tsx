import React, {useState} from 'react'
import TableCell from "@material-ui/core/TableCell";
import {Button, Link} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {PATH} from "../../Routes";
import moment from "moment";
import ModalForm from "../c9-Modal/ModalForm";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import {PackResponseDataType, PackUpdateFieldsType} from "../../../m3-dal/Api";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";
import {deletePackByIdTC, updateCardPack} from "../../../m2-bll/redux/pack-reducer";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        tableRow: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
)

export interface DeckTableRowPropsType {
    deck : PackResponseDataType
    labelId : string
}

const DeckTableRow : React.FC<DeckTableRowPropsType> = ({ deck, labelId }) => {
    debugger
    const classes = useStyles()
    const {_id} = useSelector((state: AppStoreType) => state.auth)
    const [modalDeleteStatus, setModalDeleteStatus] = useState<boolean>(false);
    const [modalEditStatus, setModalEditStatus] = useState<boolean>(false);
    const [packName, setPackName] = useState<string | null>(null)
    const dispatch = useDispatch()

    const handleDeletePack = (deckId: string) => {
        dispatch(deletePackByIdTC(deckId))
    }

    const handleEditDeck = (deckId: string) => {
        debugger
        const updateObjectFields: PackUpdateFieldsType = {
            ...(packName && {name: packName}),
        }
        dispatch(updateCardPack(deckId, updateObjectFields))
        setPackName(null)
    }

    const handlePackNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPackName(event.target.value)
    }

    return (
        <TableRow
            role="checkbox"
            tabIndex={-1}
            key={deck._id}
            className={classes.tableRow}
        >
            <TableCell component="th" id={labelId} scope="row" padding="normal">
                <Link
                    variant={"body1"}
                    component={NavLink}
                    to={`${PATH.CARDS}/${deck._id}`}
                    color={"textPrimary"}
                >
                    {deck.name.length > 20 ? deck.name.slice(0, 20) + '...' : deck.name}
                </Link>
            </TableCell>
            <TableCell align="right">{deck.cardsCount}</TableCell>
            <TableCell
                align="right">{moment(deck.updated).format("DD.MM.YYYY")}</TableCell>
            <TableCell align="right">
                {deck.user_name.length > 20 ? deck.user_name.slice(0, 20) + '...' : deck.user_name}
            </TableCell>
            <TableCell align="right">
                {
                    deck.user_id === _id &&
                    <>
                        <Button
                            onClick={() => {
                                setModalDeleteStatus(true)
                            }}>Delete</Button>
                        <Button
                            onClick={() => {
                                setModalEditStatus(true)
                            }
                            }
                        >Edit</Button>
                        <ModalForm
                            modalTitle={"Edit Pack"}
                            openStatus={modalEditStatus}
                            handleCloseModal={setModalEditStatus}
                            modalActionCallback={() => {
                                handleEditDeck(deck._id)
                            }}
                            actionButtonTitle={"Edit"}
                        >
                            <TextField
                                value={packName === null ? deck.name : packName}
                                onChange={handlePackNameChange}
                                margin="dense"
                                id="packName"
                                label="Pack name"
                                type="string"
                                fullWidth
                            />

                        </ModalForm>
                        <ModalForm
                            modalTitle={"Delete Pack"}
                            modalText={"Do you really want to delete pack"}
                            openStatus={modalDeleteStatus}
                            handleCloseModal={setModalDeleteStatus}
                            modalActionCallback={() => {
                                handleDeletePack(deck._id)
                            }}
                            actionButtonTitle={"Delete"}
                        />
                    </>
                }
                <Button onClick={()=>alert("learn")}>Learn</Button>
            </TableCell>
        </TableRow>
    )
}

export default DeckTableRow