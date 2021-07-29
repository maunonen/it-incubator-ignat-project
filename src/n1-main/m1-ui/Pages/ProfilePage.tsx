
import React, {useState} from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {loggedInTC} from "../../m2-bll/redux/auth-reducer"
import {AppStoreType} from "../../m2-bll/redux/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";

// commit

export const ProfilePage: React.FC = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStoreType, any>(state => state.auth)
    const userProfile = useSelector<AppStoreType, any>(state => state.profile)



    if (isLoggedIn.isLoggedIn) {
        return (
            <Grid container justify="center">
                <Grid item xs={4}>
                    <h1>User profile</h1>
                    <h3>Id {userProfile._id}</h3>
                    <h3>Email {userProfile.email}</h3>
                    <h3>Name {userProfile.name}</h3>
                    <h3>Avatar <img src={userProfile.avatar} style={{width: 100}}/> </h3>
                    <h3>PublicCardPacksCount= {userProfile.publicCardPacksCount}</h3>

                </Grid>
            </Grid>
        )
    } else {
        return  (
            <Redirect from={PATH.ALL_ROUTES} to="/login"/>
            )
    }
}

export default ProfilePage


