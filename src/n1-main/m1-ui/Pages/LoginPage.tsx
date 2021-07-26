
import React, {useState} from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {loggedInTC} from "../../m2-bll/redux/auth-reducer"
import {AppStoreType} from "../../m2-bll/redux/store";



export const LoginPage = () => {

    const isLoggedIn=useSelector<AppStoreType>(state=>state.auth)

    console.log(isLoggedIn)

    const [email, setEmail] = useState<string>("nya-admin@nya.nya");
    const [password, setPass] = useState<string>("1qazxcvBG");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
     const dispatch=useDispatch()

    // commit

    const submitHandler=(event:any)=>{
        event.preventDefault()

         dispatch(loggedInTC(email, password, rememberMe))
    }

    const changeInputEmailHandler=(event:any)=>{
        setEmail(event.currentTarget.value)
    }

    const changeInputPassHandler=(event:any)=>{
        setPass(event.currentTarget.value)
    }

    const changeRememberCheckboxHandler=(event:any)=>{
        setRememberMe(event.currentTarget.checked)
    }
    
    return <Grid container justify="center">
        <Grid item xs={4}>
          <form onSubmit={submitHandler}>
            <FormControl>
                <FormLabel>
                      Login user
                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        name="Email"
                        value={email}
                        onChange={changeInputEmailHandler}
                    />
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        value={password}
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
