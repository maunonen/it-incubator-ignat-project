import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {useFormik} from "formik";
import {NavLink, Redirect} from "react-router-dom";
import {
    Button, Card, createStyles, FormControl, FormGroup, Checkbox,
    Grid, makeStyles, TextField, Theme, Typography, FormControlLabel
} from "@material-ui/core";
import {loggedInTC} from "../../m2-bll/redux/auth-reducer";


const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        maxWidth: "413px",
    },
    formTitle: {
        marginBottom: "30px",
    },
    formDescription: {
        marginTop: "20px",
        marginBottom: "10px",
    },
    formButtonBlock: {
        margin: "0px 35px"
    }
}))


type FormikErrorType = {
    email?: string
    password?: string
}

const LoginPage: React.FC = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)
    const isLoggedError = useSelector((state: AppStoreType) => state.auth.error)

    const formik = useFormik({
        initialValues: {
            email: 'nya-admin@nya.nya',
            password: '1qazxcvBG',
            remember: true
        },

        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Password must be 7 characters or more'
            }
            return errors;
        },

            onSubmit: values => {
            dispatch(loggedInTC(values.email, values.password, values.remember))
        },

    })


    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid
        container
        justify="center"
        alignItems="center"
        style={{minHeight: '100vh'}}
    >
        <Card className={classes.root}>
            <Grid item>
                <form onSubmit={formik.handleSubmit}>
                    <Typography
                        variant={"h1"}
                        className={classes.formTitle}
                    >Login
                    </Typography>
                    <div style={{color: "red"}}>{isLoggedError}</div>
                    <Typography
                       variant={"body1"}
                        className={classes.formDescription}
                        align={"left"}
                    > Enter your email address and password
                    </Typography>

                    <FormControl>
                        <FormGroup>
                            <TextField
                                type="email"
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>
                            }
                            <TextField
                                type="password"
                                label="password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                            }

                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox
                                checked={formik.values.remember}
                                {...formik.getFieldProps('remember')}
                                />}
                            />

                            <div style={{display: 'flex', justifyContent: "center"}}>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    className={classes.formButtonBlock}
                                    color={'primary'}>
                                    Loggin
                                </Button>
                                <Button
                                    type={'reset'}
                                    onClick={() => {formik.resetForm()}}
                                    variant={'contained'}
                                    className={classes.formButtonBlock}
                                    color={'primary'}>
                                    Reset
                                </Button>
                            </div>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Card>
    </Grid>
}
export default LoginPage


