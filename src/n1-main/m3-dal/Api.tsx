import axios from 'axios'
import {UserProfileType} from '../m2-bll/redux/profile-reducer';

const settings = {
    withCredentials: true
};
const instance = axios.create({
     baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/',
    ...settings
})

// api

export type UserLoginType = {
    _id:string;
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number
}

type registrationUserType = {
    addedUser: {}
    error?: string
}

export type UserForgotPassType = {
    info: string
    success: boolean
    answer: boolean
    html: boolean
}
export type UserNewPasswordType = {
    info : string
}

            // accessAPI правильно пишется
export const acsessAPI = {
    loginUser(email:string, password:string, rememberMe:boolean) {
        const promise = instance.post<UserProfileType>("/auth/login",{email, password, rememberMe});
        return promise
    },
    registrationUser(email: string, password: string) {
        const promise = instance.post<registrationUserType>("/auth/register", {email, password})
        return promise
    },
    forgotPassword(email: string, from: string, message: string) {
        return instance.post<UserForgotPassType>("/auth/forgot", {email, from, message});
    },
    setNewPassword(password : string , resetPasswordToken : string) {
        return instance.post<UserNewPasswordType>("/auth/set-new-password" , {password, resetPasswordToken});
    },
    authUser(){
        return instance.post<any>("/auth/me" , {});
    },
}






