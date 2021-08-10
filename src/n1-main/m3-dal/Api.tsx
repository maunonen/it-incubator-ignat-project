import axios from 'axios'

const settings = {
    withCredentials: true
};
const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    ...settings
})

// Types for delete card object

export interface DeleteCardResponseType {
    deletedCard: UpdateCardType
    token: string
    tokenDeathTime: number
}

// Types for post card object
export interface PostCardResponseType {
    newCard: CardType
    token: string
    tokenDeathTime: number
}

// Types for Update Card Request
export interface UpdateCardType extends CardType {
    answerImg: string
    answerVideo: string
    questionImg: string
    questionVideo: string
}

// Types for Update Card Request
export interface UpdateCardResponseType {
    updatedCard: UpdateCardType
    token: string
    tokenDeathTime: number
}

// Types for Update card request

// Update Card Fields
export interface UpdateCardFieldsType {
    _id?: string
    question?: string
    answer?: string
    comments?: string
    grade?: number
    shots?: number
    type?: string
    /*more_id? : "6101043d9906843f45c0f27f",*/
    __v?: 0,
    answerImg?: string
    answerVideo?: string
    questionImg?: string
    questionVideo?: string
}

export interface UpdateCardQueryType {
    card: UpdateCardFieldsType
}

// Types for post card object

export interface PostCardFieldsType {
    cardsPack_id?: string
    question?: string
    answer?: string
    grade?: 0 | 1 | 3 | 4 | 5
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}

export interface PostCardQueryType {
    card: PostCardFieldsType
}

// Types for Get Card Query
export interface GetCardQueryType {
    params: {
        cardsPack_id: string
        cardAnswer?: string | null
        cardQuestion?: string | null
        min?: number | null
        max?: number | null
        sortCards?: string | null
        page?: number | null
        pageCount?: number | null
    }
}

// Types for Get Card Query
export interface CardType {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}

// Types for Get Card Query
export interface GetCardResponseType {
    cards: Array<CardType>
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}

export type UserProfileType = {
    _id: string;
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: string,
    update: string,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
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
    deckCover: string
}

export interface UpdatePackResponseType {
    updatedCardsPack: PackUpdateResponseDataType,
    token: string
    tokenDeathTime: number
}

export interface NewPackFieldsType {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    privateDeck?: boolean
    type?: string
}

export interface NewPackObjectDataType {
    cardsPack: NewPackFieldsType
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

 export interface PackUpdateFieldsType {
     _id?: string
     name?: string
     path?: string
     grade?: number
     shots?: number
     rating?: number
     deckCover?: string
     private?: boolean
     type?: string
 }

export interface PackUpdateObjectType {
    cardsPack: PackUpdateFieldsType
}

export const acsessAPI = {
    loginUser(email: string, password: string, rememberMe: boolean) {
        return instance.post<UserProfileType>("/auth/login", {email, password, rememberMe});

    },
    logoutUser() {
        return instance.delete<UserProfileType>("/auth/login",);

    },
    registrationUser(email: string, password: string) {
        return instance.post<registrationUserType>("/auth/register", {email, password})

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
    // API for cards
    getAllCards(queryCardsObject: GetCardQueryType) {
        return instance.get<GetCardResponseType>("/cards/card", queryCardsObject);
    },
    postCard(newCardObject: PostCardQueryType) {
        return instance.post<PostCardResponseType>("/cards/card", newCardObject);
    },
    updateCardById(cardUpdateObject: UpdateCardQueryType) {
        return instance.put<UpdateCardResponseType>("/cards/card", cardUpdateObject);
    },
    deleteCardByID(id: string) {
        return instance.delete<DeleteCardResponseType>("/cards/card", {params: {id}});
    },
}







