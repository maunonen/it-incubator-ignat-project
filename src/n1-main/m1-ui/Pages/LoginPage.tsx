

import React, {useState} from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'



export const LoginPage = () => {

    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [checkBox, setCheckBox] = useState<boolean>(false);




    const submitHandler=(event:any)=>{
        event.preventDefault()
        console.log(email)
        console.log(pass)
        console.log(checkBox)
    }

    const changeInputEmailHandler=(event:any)=>{
        setEmail(event.currentTarget.value)
    }

    const changeInputPassHandler=(event:any)=>{
        setPass(event.currentTarget.value)
    }

    const changeRememberCheckboxHandler=(event:any)=>{
        setCheckBox(event.currentTarget.checked)
    }


    return <Grid container justify="center">
        <Grid item xs={4}>
          <form onSubmit={submitHandler}>
            <FormControl>
                <FormLabel>
                      Submit user
                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        name="Email"
                        // value="email"
                        onChange={changeInputEmailHandler}
                    />
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        // value="pass"
                        onChange={changeInputPassHandler}
                    />
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox />}
                        onChange={changeRememberCheckboxHandler}
                    />
                    <Button type={'submit'}
                            variant={'contained'}
                            color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
          </form>
        </Grid>
    </Grid>
}

export default LoginPage
