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
    info: string
}

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

    //--------------test api for lesson 2-------------------------------------------------


      getCard() {
        const promise = instance.get<any>("/cards/pack?pageCount=10&page=4&sortPacks=0updated");
        return promise
    //  ?packName=someName - search by name
    },

    //------------------------------------------------------------------------------------
    //sortPack=0updated



    /*postCardsPack(packName: string, min: number, max : number, sortPacks : number, page : number, pageCount : number, userId : string  ) {
        return instance.post<any>("/cards/pack", {});
    },
    getCardsPack(packName: string, min: number, max : number, sortPacks : number, page : number, pageCount : number, userId : string  ) {
        return instance.get<any>("/cards/pack", {params: {packName: packName}});
    },
    deleteCardsPack(id : string ) {
        return instance.delete<any>("/cards/pack", {params: {id: id}});
    },
    updateCardsPack(_id : string ) {
        return instance.put<any>("/cards/pack", {_id : _id });
    },*/
}






