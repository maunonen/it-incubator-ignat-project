import React, {KeyboardEventHandler, useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {addNewPackTC, setPackNameAC} from "../../../m2-bll/redux/pack-reducer";
import {NewPackFieldsType, NewPackObjectDataType} from "../../../m3-dal/Api";
import {getAllCardsTS} from "../../../m2-bll/redux/card-reducer";
import {AppStoreType} from "../../../m2-bll/redux/store";


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

    const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    /*const buttonClickHandler = () => {
        addPack();
    };*/

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
                                dispatch(getAllCardsTS(props.packId, { cardQuestion : search}))
                                setSearch('');
                            }
                        }}
                    />
                </Grid>
                {/*<Grid
                    item
                    className={classes.addDeckBlock}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={buttonClickHandler}
                    >
                        Add new pack
                    </Button>
                </Grid>*/}
            </Grid>
        </div>
    );
}

export default SearchCard