import React, {useEffect} from 'react';
import {createStyles, lighten, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment'
import {
    getAllCardsTS,
    setPageAC,
    setPageCountAC,
    setSortDirectionAscAC,
    setSortFieldAC
} from '../../../m2-bll/redux/card-reducer';
import {AppStoreType} from '../../../m2-bll/redux/store';
import {CardType} from "../../../m3-dal/Api";
import {useParams} from "react-router-dom";
import CardTableHeader from './CardTableHeader';
import {Button, TablePagination} from "@material-ui/core";
import {deletePackByIdTC} from "../../../m2-bll/redux/pack-reducer";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

/*function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}*/

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        tableRow: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);

const CardTable: React.FC = () => {
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const {packId} = useParams<{ packId: string }>()

    const {card} = useSelector((state: AppStoreType) => state)
    console.log('packId', packId)
    console.log('card', card)

    const {_id} = useSelector((state: AppStoreType) => state.auth)
    const dispatch = useDispatch()

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CardType) => {
        dispatch(setSortDirectionAscAC(!card.isSortTypeAscending))
        dispatch(setSortFieldAC(property))
    };

    useEffect(() => {
            dispatch(getAllCardsTS(packId))
        }, [
            card.isSortTypeAscending, card.sortField,
            card.page, card.pageCount, card.page
        ]
    )


    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPageAC(newPage + 1));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCountAC(parseInt(event.target.value, 10)))
        /*setPage(0);*/
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        /*size={dense ? 'small' : 'medium'}*/
                        size={'small'}
                        aria-label="enhanced table"
                    >
                        <CardTableHeader
                            numSelected={selected.length}
                            /*onSelectAllClick={handleSelectAllClick}*/
                            onRequestSort={handleRequestSort}
                            rowCount={card.cardsTotalCount || 0}
                        />
                        <TableBody>
                            {
                                card.cards.length > 0 && card.cards
                                    .map((card, index) => {
                                        /*const isItemSelected = isSelected(deck.name);*/
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                /*hover*/
                                                /*onClick={(event) => handleClick(event, pack.name)}*/
                                                role="checkbox"
                                                /*aria-checked={isItemSelected}*/
                                                tabIndex={-1}
                                                key={index}
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
                                                    </>
                                                }
                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    // total number of rows from server side
                    count={card.cardsTotalCount || 0}
                    // rows per page
                    rowsPerPage={card.pageCount || 5}
                    // current page(starts from 0) from server side - 1
                    page={(card.page && (card.page - 1)) || 0}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
export default CardTable