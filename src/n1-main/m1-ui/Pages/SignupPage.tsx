import React from 'react'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from "../Routes";
import {AppStoreType} from "../../m2-bll/redux/store";
import {
    FormControl,
    FormGroup,
    TextField,
    Button,
    Grid,
    makeStyles,
    Theme,
    createStyles,
    Card, Typography, Link
} from '@material-ui/core'
import {registrationThunk} from "../../m2-bll/redux/auth-reducer";


type FormikErrorType = {
    email?: string
    password?: string
    cfPassword?: string
}

const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        /*maxWidth: "413px",*/
        width: "413px",
    },
    formTitle: {
        marginBottom: "30px",
    },
    formSubtitle: {
        marginBottom: "40px",
    },
    formDescription: {
        marginTop: "20px",
        marginBottom: "40px",
    },
    formLinkTitle: {
        paddingTop: "30px",
        paddingBottom: "15px",
    },

    displayStretch: {
        display: "flex",
        alignItems: "stretch"
    },
    textFieldArea: {
        margin: "0px 10px"
    },
    formButtonBlock: {
        margin: "0px 35px",
        display: "flex",
        alignItems: "",
    },
    resetButton: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        marginRight: "15px",
    },
    submitButton: {
        flex: 1,
        display: "flex",
        alignItems: "stretch"
    }
}))


const SignupPage: React.FC = () => {


    const classes = useStyles()
    const dispatch = useDispatch();
    const isFetching = useSelector<AppStoreType>(state => state.auth.isFetching);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            cfPassword: ''
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
            // alert(JSON.stringify(values));
            if (values.email !== '' && values.password !== '' && values.cfPassword !== '') {
                if (values.password === values.cfPassword) {
                    dispatch(registrationThunk(values.email, values.password))
                    formik.resetForm();
                }
            }
        },
        // onReset: values =>  {
        //
        //     if (values.email !== '' || values.password !== '' || values.cfPassword !== '') {
        //     formik.resetForm()}
        // }
    })

    if (isFetching) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (

        <Grid container
              justifyContent="center"
              alignItems="center"
              style={{minHeight: '100vh'}}
        >
            <Grid item>
                <Card
                    className={classes.root}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <Typography
                            variant={"h1"}
                            className={classes.formTitle}
                        >It-incubator</Typography>
                        <Typography
                            variant={"h2"}
                            className={classes.formSubtitle}
                        >Sign up</Typography>
                        <FormControl className={classes.displayStretch}>
                            <FormGroup className={classes.textFieldArea}>
                                <TextField
                                    type="email"
                                    label="Email"
                                    margin="dense"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email &&
                                <div style={{'color': 'red'}}>{formik.errors.email}</div>}

                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="dense"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password &&
                                <div style={{'color': 'red'}}>{formik.errors.password}</div>}

                                <TextField
                                    type="password"
                                    label="Confirm password"
                                    margin="dense"
                                    {...formik.getFieldProps('cfPassword')}
                                />
                                {formik.touched.cfPassword && formik.errors.cfPassword &&
                                <div style={{'color': 'red'}}>{formik.errors.cfPassword}</div>}
                                <Typography
                                    variant={"body1"}
                                    className={classes.formDescription}
                                    style={{marginTop: "20px", marginBottom: "30px"}}
                                    align={"left"}
                                >Enter your email address and password</Typography>

                                <div className={classes.formButtonBlock}>
                                    <Button
                                        onClick={() => {
                                            formik.resetForm()
                                        }}
                                        className={classes.resetButton}
                                        type={'reset'}
                                        variant={'outlined'}
                                        color={'secondary'}
                                    >Cancel</Button>
                                    <Button
                                        type={'submit'}
                                        variant={'contained'}
                                        className={classes.submitButton}
                                        color={'primary'}
                                    >Register</Button>
                                </div>
                                <Typography
                                    variant={"body1"}
                                    className={classes.formLinkTitle}
                                    style={{marginTop: "0px", marginBottom: "15px"}}
                                >Already have an account?</Typography>
                                <Link
                                    component={NavLink}
                                    to={PATH.LOGIN}
                                    color={"textPrimary"}
                                >Log in here
                                </Link>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}
export default SignupPage