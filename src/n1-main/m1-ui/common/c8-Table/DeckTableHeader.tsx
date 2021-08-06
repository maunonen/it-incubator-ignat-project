import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {PackDataType} from "../../../m3-dal/Api";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/redux/store";

interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

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

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof PackDataType;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
    {id: 'cardsCount', numeric: true, disablePadding: false, label: 'Cards'},
    {id: 'updated', numeric: true, disablePadding: false, label: 'Last updated'},
    {id: 'user_name', numeric: true, disablePadding: false, label: 'Created by'},
];

interface DeckTableHeaderPropsType {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof PackDataType) => void;
    onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
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


const DeckTableHeader: React.FC<DeckTableHeaderPropsType> = (props) => {
    const classes = useStyles()
    const {numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property: keyof PackDataType) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };
    const {sortField, isSortTypeAscending} = useSelector((state: AppStoreType) => state.pack)

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={isSortTypeAscending ? 'asc' : 'desc'}
                    >
                        <TableSortLabel
                            active={sortField === headCell.id}
                            direction={isSortTypeAscending ? 'asc' : 'desc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {sortField === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                            {isSortTypeAscending ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell
                    align={'center'}
                >Action</TableCell>
            </TableRow>
        </TableHead>
    );
}

export default DeckTableHeader