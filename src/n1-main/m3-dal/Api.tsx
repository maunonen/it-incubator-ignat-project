import axios from 'axios'

const settings = {
    withCredentials: true
};
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/',
    ...settings
})

// api

export type UserProfileType = {
    _id:string;
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: string,
    update: string,
    isAdmin: boolean,
    verified:boolean,
    rememberMe:boolean,
    error: string
}

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
    cardPacks: Array<PackResponseDataType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

export interface GetPackResponseWithDateType extends Omit<GetPackResponseType, 'cardPacks'> {
    cardPacks: Array<PackDataType>
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

export interface NewPackObjectDataType {
    cardsPack: {
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        privateDeck?: boolean
        type?: string
    }
}

export interface GetPackQueryParamsType {
    params?: {
        packName?: string | null
        min?: number | null
        max?: number | null
        sortPacks?: string | null
        page?: number | null
        pageCount?: number | null
        user_id?: string | null
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
    logoutUser() {
        const promise = instance.delete<UserProfileType>("/auth/login",);
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

    postCardPacks(pack: NewPackObjectDataType) {
        return instance.post<NewPackResponseType>("/cards/pack", pack);
    },
    getCardPacks(queryPackObject: GetPackQueryParamsType) {
        return instance.get<GetPackResponseType>("/cards/pack", queryPackObject);
    },
    deleteCardsPacks(id: string) {
        return instance.delete<DeletePackResponseType>("/cards/pack", {params: {id}});
    },
    updateCardPacks(packUpdateObject: PackUpdateObjectType) {
        return instance.put<PackUpdateResponseDataType>("/cards/pack", packUpdateObject);
    },
}






