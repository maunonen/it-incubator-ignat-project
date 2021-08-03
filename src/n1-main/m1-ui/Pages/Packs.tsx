import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {NavLink, Redirect} from "react-router-dom";
import {
    Button, Card, createStyles, FormControl, FormGroup, Checkbox,
    Grid, makeStyles, TextField, Theme, Typography, FormControlLabel, Link
} from "@material-ui/core";
import {loggedInTC} from "../../m2-bll/redux/auth-reducer";
import {PATH} from "../Routes";
import {acsessAPI} from "../../m3-dal/Api";
import {log} from "util";


const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        width: "413px",
        /*maxWidth : "413px",*/
    },
    formTitle: {
        marginBottom: "30px",
    },
    formSubtitle: {
        marginBottom: "40px",
    },
    formDescription: {
        /*marginTop : "20px",*/
        marginBottom: "40px",
    },
    formButtonBlock: {
        margin: "0px 35px",
        display: "flex",
        alignItems: "",
    },
    displayStretch: {
        display: "flex",
        alignItems: "stretch"
    },
    textFieldArea: {
        margin: "0px 10px"
    },
}))


type FormikErrorType = {
    email?: string
    password?: string
}

const Packs: React.FC = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)
    const isLoggedError = useSelector((state: AppStoreType) => state.auth.error)


    const [packsData, setPacksData] = useState<any>([]);


    const restoreSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: 'nya-admin@nya.nya',
            password: '1qazxcvBG',
            remember: false
        },
        validationSchema: restoreSchema,
        onSubmit: values => {
            dispatch(loggedInTC(values.email, values.password, values.remember))
            formik.resetForm()
        },
    })


    //--------------------------------------------------------------------

    const getCard = () => {
        acsessAPI.getCard()
            .then(res => {
                console.log(res.data.cardPacks[0])
                // console.log(res.data.cardPacks[0].cardsCount)
                setPacksData(
                    //@ts-ignore
                    res.data.cardPacks.map(element => <div ><td>name={element.name} cardCount={element.cardsCount}</td></div> ))
            }

            )
             .catch(rej => console.log(rej))
    }


    //--------------------------------------------------------------------

    console.log(packsData)

    return <Grid
        container
        justify="center"
        alignItems="center"
        style={{minHeight: '100vh'}}
    >

        <Grid item>
            <Card className={classes.root}>

                <form onSubmit={formik.handleSubmit}>
                    <Typography
                        variant={"h1"}
                        className={classes.formTitle}
                    >Put name for search Packs
                    </Typography>
                    <FormControl className={classes.displayStretch}>
                        <FormGroup className={classes.textFieldArea}>
                            <TextField
                                type="password"
                                label="name packs"
                                margin="dense"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                            }
                            <Button
                                type={'submit'}
                                onClick={getCard}
                                variant={'contained'}
                                className={classes.formButtonBlock}
                                color={'primary'}>
                                get card
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Card>

                                <table>
                                    <tr>
                                {packsData}
                                    </tr>
                                </table>

        </Grid>


    </Grid>
}
export default Packs
