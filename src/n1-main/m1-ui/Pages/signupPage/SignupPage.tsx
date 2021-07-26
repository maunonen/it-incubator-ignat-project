import React from 'react'
import {FormControl, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import s from './signupPage.module.css'
import {useFormik} from "formik";


type FormikErrorType = {
    email?: string
    password?: string
    cfPassword?: string
}

//commit

const SignupPage: React.FC = () => {


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
            } else if (values.password.length < 4) {
                errors.password = 'Password must be 4 characters or more'
            }


            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    })


    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <Grid container justify="center">
                    <Grid item xs={3}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl style={{width: '250px', }}>
                                <FormLabel>
                                    <h1>It-incubator</h1>
                                    <h2>Sign up </h2>

                                </FormLabel>
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
                        </form>

                    </Grid>
                    <p>
                        Already have an account? <a href="/login">Log in here</a>
                    </p>
                </Grid>

            </div>
        </div>
    )
}
export default SignupPage