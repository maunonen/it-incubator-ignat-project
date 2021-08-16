import React from 'react'
import TableCell from "@material-ui/core/TableCell";
import moment from "moment";
import {Button, createStyles} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import {CardType} from "../../../m3-dal/Api";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";

export interface CardTableRowPropsType {
    card: CardType
    labelId : string
}

const useStyles = makeStyles((theme ) =>
    createStyles({
        root: {

        },
        tableRow: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
)


const CardTableRow: React.FC<CardTableRowPropsType> = ({ card, labelId}) => {
    const classes = useStyles()
    const {_id} = useSelector((state: AppStoreType) => state.auth)
    const dispatch = useDispatch()

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
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </>
            }
        </TableRow>
    )

}

export default CardTableRow