import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {NavLink, Redirect} from "react-router-dom";
import {Button, Card, createStyles, FormControl, FormGroup, Checkbox,
        Grid, makeStyles, TextField, Theme, Typography, FormControlLabel
} from "@material-ui/core";
import {loggedInTC} from "../../m2-bll/redux/auth-reducer";


const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        maxWidth : "413px",
    },
    formTitle: {
        marginBottom: "30px",
    },
    formDescription : {
        marginTop : "20px",
        marginBottom : "40px",
    },
    formButtonBlock : {
        margin: "0px 35px"
    }
}))


type FormikErrorType = {email?: string}

const LoginPage: React.FC = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)

    const restoreSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: 'nya-admin@nya.nya',
            password: '1qazxcvBG',
            remember: true
        },
        validationSchema: restoreSchema,
        onSubmit: values => {
            dispatch(loggedInTC(values.email, values.password, values.remember))
            formik.resetForm()
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
                            { formik.touched.email && formik.errors.email &&
                              <div style={{color: 'red'}}>{formik.errors.email}</div>
                            }
                            <TextField
                                type="password"
                                label="password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />

                             <FormControlLabel
                                  label={'Remember me'}
                                  control={<Checkbox/>}
                                 // onChange={changeRememberCheckboxHandler}
                                  {...formik.getFieldProps('remember')}
                                />






                            {/*-----value less then------------------------*/}
                            { formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                            }
                            {/*-----------------------------*/}




                            <Button
                                type={'submit'}
                                variant={'contained'}
                                className={classes.formButtonBlock}
                                color={'primary'}>Loggin</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Card>
    </Grid>
}
export default LoginPage


