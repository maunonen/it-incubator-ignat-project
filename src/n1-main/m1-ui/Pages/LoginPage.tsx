import React from 'react'
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
import {useHistory} from "react-router-dom";



const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        width: "413px",
    },
    formTitle: {
        marginBottom: "30px",
    },
    formSubtitle: {
        marginBottom: "40px",
    },
    formDescription: {
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

const LoginPage: React.FC = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)
    const isLoggedError = useSelector((state: AppStoreType) => state.auth.error)

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

    const history = useHistory();


    if (isLoggedIn) {
        return <Redirect to={'/'}/>
        // history.push( '/pack' );
        // history.goBack();
    }

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
                    >It-Incubator
                    </Typography>
                    <Typography
                        variant={"h2"}
                        className={classes.formSubtitle}
                    >Signin</Typography>
                    <div style={{color: "red"}}>{isLoggedError}</div>
                    <FormControl className={classes.displayStretch}>
                        <FormGroup className={classes.textFieldArea}>
                            <TextField
                                type="email"
                                label="Email"
                                margin="dense"
                                {...formik.getFieldProps('email')}
                            />
                            { formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>
                            }
                            <TextField
                                type="password"
                                label="password"
                                margin="dense"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                            }
                            <Typography
                                variant={"body1"}
                                className={classes.formDescription}
                                align={"left"}
                            >Enter your email address and password
                            </Typography>


                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox/>}
                                // onChange={changeRememberCheckboxHandler}
                                {...formik.getFieldProps('remember')}
                            />

                            <div className={classes.formButtonBlock}>
                            <Button
                                type={'reset'}
                                onClick={() => {formik.resetForm()}}
                                variant={'contained'}
                                className={classes.formButtonBlock}
                                color={'primary'}>
                                Reset
                            </Button>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                className={classes.formButtonBlock}
                                color={'primary'}>
                                Login
                            </Button>
                            </div>

                            <Typography
                                variant={"body1"}
                                className={classes.formLinkTitle}
                                style={{ marginTop : "30px", marginBottom : "15px"}}
                            >Don't have an account</Typography>
                            <Link
                                component={NavLink}
                                to={PATH.SIGNUP}
                                color={"textPrimary"}
                            >Sign up
                            </Link>
                        </FormGroup>
                    </FormControl>
                </form>
            </Card>
        </Grid>
    </Grid>
}
export default LoginPage
