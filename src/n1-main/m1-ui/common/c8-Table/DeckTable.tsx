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
    const [dense, setDense] = useState(false);
    const [packName, setPackName] = useState<string | null>(null)

    // Open status of modal for add, delete, edit modals
    const [modalDeleteStatus, setModalDeleteStatus] = useState<boolean>(false);
    const [modalEditStatus, setModalEditStatus] = useState<boolean>(false);


    const {pack} = useSelector((state: AppStoreType) => state)
    const {_id} = useSelector((state: AppStoreType) => state.auth)
    const dispatch = useDispatch()

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof PackDataType) => {
        dispatch(setPackSortType(!pack.isSortTypeAscending, property))
    };

    useEffect(() => {
        dispatch(getAllPack())
    }, [pack.isSortTypeAscending, pack.sortField, pack.page, pack.pageCount, pack.packName])

    const handleDeletePack = (deckId: string) => {
        dispatch(deletePackByIdTC(deckId))
    }

    const handleEditDeck = (deckId: string) => {
        const updateObjectFileds: PackUpdateFieldsType = {
            ...(packName && {name: packName}),
        }
        dispatch(updateCardPack(deckId, updateObjectFileds))
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPageAC(newPage + 1));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCountAC(parseInt(event.target.value, 10)))
        /*setPage(0);*/
    };

    const handlePackNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPackName(event.target.value)
    }

    return (
        <div className={classes.root}>
            {/*<Button onClick={() => dispatch(deletePackByIdTC("6114f04f0030860004fc05a9"))}>TEST DELETE PACK</Button>*/}
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
                                            <TableRow
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
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
                                                <TableCell align="right">{deck.user_name}</TableCell>
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
                                                                /*modalText={"Do you really want to delete pack"}*/
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
