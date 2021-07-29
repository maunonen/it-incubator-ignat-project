import React from 'react'
import {useFormik} from "formik";
import {registrationThunk} from "./signupReducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
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
    Theme,
    createStyles,
    Card, Typography
} from '@material-ui/core'


type FormikErrorType = {
    email?: string
    password?: string
    cfPassword?: string
}

const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center"
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
              justify="center"
              alignItems="center"
              style={{minHeight: '100vh'}}
        >
            <Card
                className={classes.root}
            >
                <Grid item xs={3}>
                    <form onSubmit={formik.handleSubmit}>
                        <Typography>It-incubator</Typography>
                        <Typography>Sign up</Typography>
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


                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '40px'}}>
                                <Button
                                    onClick={() => {formik.resetForm()}}
                                    style={{margin: '5px'}}
                                    type={'reset'}
                                    variant={'outlined'}
                                    color={'secondary'}
                                    size={'small'}>Cancel</Button>

                                <Button

                                    style={{margin: '5px'}}
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    size={'small'}>Register</Button>

                            </div>
                        </FormControl>
                        <FormLabel>
                            <p>
                                Already have an account? <a href="/">Log in here</a>
                            </p>
                        </FormLabel>
                    </form>

                </Grid>
            </Card>
        </Grid>


    )
}
export default SignupPage