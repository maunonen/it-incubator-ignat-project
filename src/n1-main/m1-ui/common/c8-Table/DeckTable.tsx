import React, {useEffect} from 'react';
import {createStyles, lighten, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeckTableHeader from "./DeckTableHeader";
import {GetPackQueryParamsType, PackDataType} from "../../../m3-dal/Api";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";
import {stat} from "fs";
import {Button} from "@material-ui/core";
import {
    deletePackByIdTC,
    getAllPack,
    setPackSortType,
    setPageAC,
    setPageCountAC
} from "../../../m2-bll/redux/pack-reducer";
import moment from 'moment'

interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
): Data {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

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

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

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
    const [order, setOrder] = React.useState<Order>('asc');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    /*const [rowsPerPage, setRowsPerPage] = React.useState(5);*/

    /*const {cardPacks, isSortTypeAscending, sortField} = useSelector((state: AppStoreType) => state.pack)*/
    const {pack} = useSelector((state: AppStoreType) => state)

    const {_id} = useSelector((state: AppStoreType) => state.profile)
    const dispatch = useDispatch()

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof PackDataType) => {


        dispatch(setPackSortType(!pack.isSortTypeAscending, property))

        setOrder(pack.isSortTypeAscending ? 'desc' : 'asc');

    };

    const getAllPacks = () => {
        let sortPacks
        // if sortField set create sortPacks fiedl '0created' '1updated'
        if (pack.sortField) {
            sortPacks = +pack.isSortTypeAscending + pack.sortField;
        }

        const paramsObject: GetPackQueryParamsType = {
            params: {
                ...(pack.packName === null && {packName: pack.packName}),
                ...(pack.min === null && {min: pack.min}),
                ...(pack.max === null && {max: pack.max}),
                ...(pack.page && {page: pack.page}),
                ...(pack.pageCount && {pageCount: pack.pageCount}),
                ...(pack.user_id === null && {user_id: pack.user_id}),
                ...(sortPacks && {sortPacks: sortPacks}),
            }
        }
        dispatch(getAllPack(paramsObject))
    }


    useEffect(() => {
        getAllPacks()
    }, [])

    useEffect(() => {
        getAllPacks()
    }, [pack.isSortTypeAscending, pack.sortField, pack.page, pack.pageCount])

    /*const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };*/

    /*const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };*/

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPageAC(newPage + 1));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCountAC(parseInt(event.target.value, 10)))
        setPage(0);
        /*setRowsPerPage(parseInt(event.target.value, 10));*/
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };
    console.log('cardPacks', pack.cardPacks)
    console.log('pack', pack)


    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    /*const emptyRows = pack.pageCount - Math.min(pack.pageCount, rows.length - page * pack.pageCount);*/

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/*<DeckTableToolbar numSelected={selected.length} />*/}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <DeckTableHeader
                            /*classes={classes}*/
                            numSelected={selected.length}
                            /*order={order}*/
                            /*orderBy={orderBy}*/
                            /*onSelectAllClick={handleSelectAllClick}*/
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {
                                pack.cardPacks
                                    .map((deck, index) => {
                                        const isItemSelected = isSelected(deck.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                /*onClick={(event) => handleClick(event, pack.name)}*/
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                /*key={deck.name}*/
                                                key={index}
                                                selected={isItemSelected}
                                            >
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {deck.name.length > 20 ? deck.name.slice(0, 20) + '...' : deck.name}
                                                </TableCell>
                                                <TableCell align="right">{deck.cardsCount}</TableCell>
                                                <TableCell align="right">{ moment(deck.updated).format("DD.MM.YYYY")}</TableCell>
                                                <TableCell align="right">{deck.user_name}</TableCell>
                                                <TableCell align="right">
                                                    {
                                                        deck.user_id === _id &&
                                                        <>
                                                            <Button
                                                                onClick={() => dispatch(deletePackByIdTC(deck._id))}>Delete</Button>
                                                            <Button>Edit</Button>
                                                        </>
                                                    }
                                                    <Button>Learn</Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            {/*{emptyRows > 0 && (
                                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}*/}
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
                    // current page from server side
                    page={pack.page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </div>
    );
}
export default DeckTable