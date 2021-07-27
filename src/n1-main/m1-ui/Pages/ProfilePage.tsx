import React from 'react'
import {useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";

const ProfilePage : React.FC = () => {

    const userProfile = useSelector<AppStoreType, any>(state => state.profile)

    // commit

    return (
        <>
            <h1>Profile</h1>
            <h3>Id {userProfile._id}</h3>
            <h3>Email {userProfile.email}</h3>
            <h3>Name {userProfile.name}</h3>
            <h3>Avatar <img src={userProfile.avatar} style={{width: 100}}/> </h3>
            <h3>PublicCardPacksCount= {userProfile.publicCardPacksCount}</h3>
        </>
    )
}
export default ProfilePage
