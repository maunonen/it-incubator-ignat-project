import React, {useEffect, useState} from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {UserProfileType} from "../../m2-bll/redux/profile-reducer"
import {authMeTC, InitStateType} from "../../m2-bll/redux/auth-reducer"
import {AppStoreType} from "../../m2-bll/redux/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";



import {acsessAPI} from "../../m3-dal/Api";
import {log} from "util";


export const ProfilePage: React.FC = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStoreType, InitStateType>(state => state.auth)
    const userProfile = useSelector<AppStoreType, UserProfileType>(state => state.profile)


    useEffect(() => {
        if (!userProfile._id) {
            dispatch(authMeTC())
        }
    }, [])

    //--------------------------------------------------------------------
    const getCard=()=>{

            acsessAPI.getCard()
                .then(res => console.log(res.data.cardPacks))
                .catch(rej=>console.log(rej))
    }
    //--------------------------------------------------------------------




    if (userProfile._id) {
        return (
            <Grid container justify="center">
                <Grid item xs={5}>
                    <h1>User profile</h1>
                    <h3>Id {userProfile._id}</h3>
                    <h3>Email {userProfile.email}</h3>
                    <h3>Name {userProfile.name}</h3>
                    <h3>Avatar <img src={userProfile.avatar} style={{width: 100}}/></h3>
                    <h3>PublicCardPacksCount= {userProfile.publicCardPacksCount}</h3>
                    <h3>created {userProfile.created}</h3>
                    <h3>update= {userProfile.update}</h3>
                    <h3>isAdmin= {userProfile.isAdmin}</h3>
                    <h3>verified= {userProfile.verified}</h3>
                    <h3>rememberMe= {userProfile.rememberMe}</h3>

                    <button onClick={getCard}>get card</button>


                </Grid>
            </Grid>
        )
    } else {
        return (
            <Redirect from={PATH.ALL_ROUTES} to="/login"/>
        )
    }
}

export default ProfilePage


