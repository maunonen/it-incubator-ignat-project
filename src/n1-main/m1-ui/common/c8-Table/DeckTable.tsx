import React, {useEffect, useState} from 'react';
import {createStyles, lighten, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeckTableHeader from "./DeckTableHeader";
import {PackDataType, PackUpdateFieldsType} from "../../../m3-dal/Api";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";
import {Button, Link} from "@material-ui/core";
import {
    deletePackByIdTC,
    getAllPack,
    setPackSortType,
    setPageAC,
    setPageCountAC, updateCardPack
} from "../../../m2-bll/redux/pack-reducer";
import moment from 'moment'
import {NavLink} from "react-router-dom";
import {PATH} from "../../Routes";
import ModalForm from "../c9-Modal/ModalForm";
import TextField from "@material-ui/core/TextField";
import DeckTableRow from "./DeckTableRow";

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

const DeckTable: React.FC = () => {
    const classes = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const {pack} = useSelector((state: AppStoreType) => state)
    const {_id} = useSelector((state: AppStoreType) => state.auth)
    const dispatch = useDispatch()

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof PackDataType) => {
        dispatch(setPackSortType(!pack.isSortTypeAscending, property))
    };

    useEffect(() => {
        dispatch(getAllPack())
    }, [pack.isSortTypeAscending, pack.sortField, pack.page, pack.pageCount, pack.packName])

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPageAC(newPage + 1));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCountAC(parseInt(event.target.value, 10)))
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        aria-label="enhanced table"
                    >
                        <DeckTableHeader
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            rowCount={pack.cardPacksTotalCount}
                        />
                        <TableBody>
                            {
                                pack.cardPacks
                                    .map((deck, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <DeckTableRow
                                                deck={deck}
                                                key={deck._id}
                                                labelId={labelId}
                                            />
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    // total number of rows from server side
                    count={pack.cardPacksTotalCount}
                    // rows per page
                    rowsPerPage={pack.pageCount}
                    // current page(starts from 0) from server side - 1
                    page={pack.page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
export default DeckTable
