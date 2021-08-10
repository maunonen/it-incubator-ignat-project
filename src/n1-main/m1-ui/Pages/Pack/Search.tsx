import React, {KeyboardEventHandler, useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {addNewPackTC, setPackNameAC} from "../../../m2-bll/redux/pack-reducer";
import {NewPackFieldsType, NewPackObjectDataType} from "../../../m3-dal/Api";


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

export default function FullWidthGrid() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [search, setSearch] = React.useState('');
    const [type, setType] = useState<string>('')
    const [name, setName] = useState<string>('first deck updated')
    const [path, setPath] = useState<string>('')
    const [grade, setGrade] = useState<number>(0)
    const [shots, setShots] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)
    const [deckCover, setDeckCover] = useState<string>('')
    const [privateDeck, setPrivateDeck] = useState<boolean>(false)

    const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const addPack = () => {
        let newPackObject: NewPackFieldsType = {
                ...(name && {name: name}),
                ...(path && {path: path}),
                ...(grade && {grade: grade}),
                ...(shots && {shots: shots}),
                ...(rating && {rating: rating}),
                ...(deckCover && {deckCover: deckCover}),
                /*...( privateDeck && { private: privateDeck}),*/
                ...(type && {typeDeck: type}),
        }
        dispatch(addNewPackTC(newPackObject))
    }

    const buttonClickHandler = () => {
        addPack();
        // dispatch(ignatBackRequest(value))
    };




    const handlePressEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Event', event)
        /*if (event && event == 'Enter') {
            //this.sendMessage();
        }*/
    }
    /*const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };*/


    return (
        <div
            /*className={classes.rootGrid}*/
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
                            console.log('Event', event )
                            if ( event.key === 'Enter'){
                                if (!search){
                                    dispatch(setPackNameAC(null))
                                }
                                console.log('Enter');
                                dispatch(setPackNameAC(search));
                                setSearch('');
                            }
                        }}
                    />
                </Grid>
                <Grid
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
                </Grid>
            </Grid>
        </div>
    );
}
