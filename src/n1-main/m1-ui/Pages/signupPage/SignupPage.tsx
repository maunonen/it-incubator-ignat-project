import React from 'react'
import {useFormik} from "formik";
import {registrationThunk} from "./signupReducer";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from "../../Routes";
import {AppStoreType} from "../../../m2-bll/redux/store";
import {
    FormControl,
    FormGroup,
    FormLabel,
    TextField,
    Button,
    Grid,
    makeStyles,

    createStyles,
    Card, Typography, Link, Theme
} from '@material-ui/core'


type FormikErrorType = {
    email?: string
    password?: string
    cfPassword?: string
}


const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        //maxWidth: "413px",
         minWidth : "400px",
    },
    formTitle: {
        marginBottom: "30px",
    },
    formSubtitle: {
        marginBottom: "20px",
    },
    formDescription: {
        marginTop: "20px",
        marginBottom: "40px",
    },
    formLinkTitle: {
        paddingTop: "30px",
        paddingBottom: "15px",
    },
    formButtonBlock: {
        margin: "0px 35px"
    }
}))


const SignupPage: React.FC = () => {


    const classes = useStyles()
    const dispatch = useDispatch();
    const isFetching = useSelector<AppStoreType>(state => state.signup.isFetching);

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
            <Card
                className={classes.root}
            >
                <Grid item >
                    <form onSubmit={formik.handleSubmit}>
                        <Typography
                            variant={"h1"}
                            className={classes.formTitle}
                        >It-incubator</Typography>
                        <Typography
                            variant={"h2"}
                            className={classes.formSubtitle}
                        >Sign up</Typography>
                        <FormControl>

                            <FormGroup>
                                <TextField
                                    type="email"
                                    label="Email"
                                    margin="normal"


                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email &&
                                <div style={{'color': 'red'}}>{formik.errors.email}</div>}

                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password &&
                                <div style={{'color': 'red'}}>{formik.errors.password}</div>}

                                <TextField
                                    type="password"
                                    label="Confirm password"
                                    margin="normal"
                                    {...formik.getFieldProps('cfPassword')}
                                />
                                {formik.touched.cfPassword && formik.errors.cfPassword &&
                                <div style={{'color': 'red'}}>{formik.errors.cfPassword}</div>}

                            </FormGroup>


                            <div >
                                <Button
                                    onClick={() => {formik.resetForm()}}
                                    // style={{margin: '5px'}}
                                    type={'reset'}
                                    variant={'outlined'}
                                    color={'secondary'}
                                    size={'small'}>Cancel</Button>

                                <Button

                                    // style={{margin: '5px'}}
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    size={'small'}>Register</Button>

                            </div>
                        </FormControl>
                        <FormLabel>
                            {/*<Typography*/}
                            {/*    variant={"body1"}*/}
                            {/*    className={classes.formDescription}*/}
                            {/*    align={"left"}*/}
                            {/*>*/}
                            {/*    <p>*/}
                            {/*        Already have an account? <a href="/">Log in here</a>*/}
                            {/*    </p>*/}
                            {/*</Typography>*/}
                            <Typography
                                variant={"body1"}
                                className={classes.formLinkTitle}
                            >Did you remember your password</Typography>
                            <Link
                                component={NavLink}
                                to={PATH.LOGIN}
                                color={"textPrimary"}
                            >Try logging in
                            </Link>
                        </FormLabel>
                    </form>

                </Grid>
            </Card>
        </Grid>


    )
}
export default SignupPage