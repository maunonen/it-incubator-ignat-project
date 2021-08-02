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
    _id: string;
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

export interface PackResponseDataType {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

export interface PackDataType extends Omit<PackResponseDataType, 'created' | 'updated'> {
    created: Date
    updated: Date
}

export interface GetPackResponseType {
    cardsPack: Array<PackDataType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

export interface DeletePackResponseType {
    deletedCardsPack: PackResponseDataType
    token: string
    tokenDeathTime: number
}

export type NewPackResponseType = {
    newCardsPack: PackResponseDataType,
    token: string
    tokenDeathTime: number
}

export interface PackUpdateResponseDataType extends PackResponseDataType {
    deckCover : string
}

export interface UpdatePackResponseType {
    updatedCardsPack: PackUpdateResponseDataType,
    token: string
    tokenDeathTime: number
}

export interface NewPackQueryDataType {
    cardsPack: {
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}

export interface GetPackQueryParamsType {
    params?: {
        packName?: string
        min?: number
        max?: number
        sortPacks?: string
        page?: number
        pageCount?: number
        user_id?: string
    }
}

export interface PackUpdateObjectType {
    cardsPack: {
        _id: string
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}

export const acsessAPI = {
    loginUser(email: string, password: string, rememberMe: boolean) {
        const promise = instance.post<UserProfileType>("/auth/login", {email, password, rememberMe});
        return promise
    },
    registrationUser(email: string, password: string) {
        const promise = instance.post<registrationUserType>("/auth/register", {email, password})
        return promise
    },
    forgotPassword(email: string, from: string, message: string) {
        return instance.post<UserForgotPassType>("/auth/forgot", {email, from, message});
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<UserNewPasswordType>("/auth/set-new-password", {password, resetPasswordToken});
    },
    authUser() {
        return instance.post<any>("/auth/me", {});
    },
    //sortPack=0updated
    postCardsPack(pack: NewPackQueryDataType) {
        return instance.post<NewPackResponseType>("/cards/pack", pack);
    },
    getCardsPack(queryPackObject: GetPackQueryParamsType) {
        return instance.get<GetPackResponseType>("/cards/pack", queryPackObject);
    },
    deleteCardsPack(id: string) {
        return instance.delete<DeletePackResponseType>("/cards/pack", {params: {id}});
    },
    updateCardsPack(_id: string, packUpdateObject: PackUpdateObjectType) {
        return instance.put<PackUpdateResponseDataType>("/cards/pack", packUpdateObject);
    },
}






