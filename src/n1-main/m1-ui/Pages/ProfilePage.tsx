import React, {useEffect} from 'react'
import {Grid} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux';
import {authMeTC, InitStateType} from "../../m2-bll/redux/auth-reducer"
import FilesOperations from './FilesOperations';
import {AppStoreType} from "../../m2-bll/redux/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {UserProfileType} from '../../m3-dal/Api';



export const ProfilePage: React.FC = () => {

    const dispatch = useDispatch()
    const userProfile = useSelector<AppStoreType, UserProfileType>(state => state.auth)


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
                </Grid>
                <FilesOperations/>
            </Grid>
        )
    } else {
        return (
            <Redirect from={PATH.ALL_ROUTES} to="/login"/>
        )
    }
}

export default ProfilePage


