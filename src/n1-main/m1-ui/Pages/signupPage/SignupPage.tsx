import React from 'react'
import {FormControl, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import InputAdornments from "./PasswordField";
import s from './signupPage.module.css'

const SignupPage: React.FC = () => {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <Grid container justify="center">
                    <Grid item xs={3}>
                        <FormControl>
                            <FormLabel>
                                <h1>It-incubator</h1>
                                <h2>Sign up </h2>

                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    type="email"
                                    label="Email"
                                    margin="normal"
                                />

                                <InputAdornments title={'Password'}/>

                                <InputAdornments title={'Confirm password'}/>


                                <FormGroup style={{display: 'flex', flexDirection: 'row', marginTop: '40px'}}>
                                    <Button
                                        style={{margin: '15px'}}
                                        type={'reset'}
                                        variant={'outlined'}
                                        color={'secondary'}
                                        size={'small'}>Cancel</Button>

                                    <Button
                                        style={{margin: '15px'}}
                                        type={'submit'}
                                        variant={'contained'}
                                        color={'primary'}
                                        size={'small'}>Register</Button>

                                </FormGroup>

                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>

            </div>
        </div>
    )
}
export default SignupPage