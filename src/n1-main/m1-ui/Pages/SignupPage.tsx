import React from 'react'
import {FormControl, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'

const SignupPage: React.FC = () => {
    return (

        <Grid container justify="center">


            <Grid item xs={4}>
                <FormControl>
                    <FormLabel>
                        <h1>IT incubator</h1>
                        <p>Sign up </p>

                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                        />

                        <FormGroup>
                            <Button type={'reset'} variant={'contained'} color={'primary'}>Cancel</Button>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Register</Button>
                        </FormGroup>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>


    )
}
export default SignupPage