import {
    acsessAPI, CardType, GetCardQueryType,
    GetPackQueryParamsType,
    NewPackObjectDataType,
    PackDataType,
    PackResponseDataType, PackUpdateObjectType
} from "../../m3-dal/Api";
import {AppStatusType, setAppStatusAC, setMessageErrorAC} from "./app-reducer";
import {Dispatch} from "redux";
import store from '../redux/store'


import {ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "./store";

export enum ACTIONS_TYPE {
    SET_CARDS_ARRAY = 'CardReducer/SET_CARDS_ARRAY',
    SET_PACK_USER_ID = 'CardReducer/SET_PACK_USER_ID',
    SET_SORT_FIELD = 'CardReducer/SET_SORT_FIELD',
    SET_SORT_ASC = 'CardReducer/SET_SET_SORT_ASC',
    SET_PAGE = 'CardReducer/SET_PAGE',
    SET_PAGE_COUNT = 'CardReducer/SET_PAGE_COUNT',
    SET_CARDS_TOTAL_COUNT = 'CardReducer/SET_CARDS_TOTAL_COUNT',
    SET_MIN_GRADE = 'CardReducer/SET_MIN_GRADE',
    SET_MAX_GRADE = 'CardReducer/SET_MAX_GRADE',

}

export interface InitialCardStateType {
    cards: Array<CardType>
    packUserId: string
    // for sort card in table
    isSortTypeAscending: boolean
    sortField: keyof CardType | null
    // for pagination
    page: number
    pageCount: number
    cardsTotalCount: number
    // card grade
    minGrade: number
    maxGrade: number
}

const initialCardState: InitialCardStateType = {
    cards: [],
    packUserId: '',
    // Get card Query parameter
    sortField: 'question',
    isSortTypeAscending: false,
    page: 0,
    pageCount: 5,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
}


export const cardReducer = (state: InitialCardStateType = initialCardState, action: CombinedActionType): InitialCardStateType => {
    /*console.log('action type', action.type)*/
    /*console.log('action payload', action.payload)*/

    switch (action.type) {
        case ACTIONS_TYPE.SET_CARDS_ARRAY:
        case ACTIONS_TYPE.SET_PACK_USER_ID:
        case ACTIONS_TYPE.SET_SORT_FIELD:
        case ACTIONS_TYPE.SET_SORT_ASC:
        case ACTIONS_TYPE.SET_PAGE:
        case ACTIONS_TYPE.SET_PAGE_COUNT:
        case ACTIONS_TYPE.SET_CARDS_TOTAL_COUNT:
        case ACTIONS_TYPE.SET_MIN_GRADE:
        case ACTIONS_TYPE.SET_MAX_GRADE:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};
export type CombinedActionType =
    SetCardsArrayType | SetPackUserId |
    SetSortFieldType | SetIsSortAscType |
    SetPageType | SetPageCountType |
    SetCardsTotalCountType | SetMinGradeType |
    SetMaxGradeType

export type SetCardsArrayType = ReturnType<typeof setCardsArrayAC>
export type SetPackUserId = ReturnType<typeof setPackUserIdAC>
export type SetSortFieldType = ReturnType<typeof setSortFieldAC>
export type SetIsSortAscType = ReturnType<typeof setSortDirectionAscAC>
export type SetPageType = ReturnType<typeof setPageAC>

export type SetPageCountType = ReturnType<typeof setPageCountAC>
export type SetCardsTotalCountType = ReturnType<typeof setCardsTotalCountAC>
export type SetMinGradeType = ReturnType<typeof setMinGradeAC>
export type SetMaxGradeType = ReturnType<typeof setMaxGradeAC>

export const setMaxGradeAC = (maxGrade: number) => ({
    type: ACTIONS_TYPE.SET_MAX_GRADE,
    payload: {
        maxGrade
    }
})

export const setMinGradeAC = (minGrade: number) => ({
    type: ACTIONS_TYPE.SET_MIN_GRADE,
    payload: {
        minGrade
    }
})

export const setCardsTotalCountAC = (cardsTotalCount: number) => ({
    type: ACTIONS_TYPE.SET_CARDS_TOTAL_COUNT,
    payload: {
        cardsTotalCount
    }
})

export const setPageCountAC = (pageCount: number) => ({
    type: ACTIONS_TYPE.SET_PAGE_COUNT,
    payload: {
        pageCount
    }
})

export const setPageAC = (page: number) => ({
    type: ACTIONS_TYPE.SET_PAGE,
    payload: {
        page
    }
})

export const setSortDirectionAscAC = (isSortTypeAscending: boolean) => ({
    type: ACTIONS_TYPE.SET_SORT_ASC,
    payload: {
        isSortTypeAscending
    }
})

export const setSortFieldAC = (sortField: keyof CardType) => ({
    type: ACTIONS_TYPE.SET_SORT_FIELD,
    payload: {
        sortField
    }
})

export const setPackUserIdAC = (packUserId: string) => ({
    type: ACTIONS_TYPE.SET_PACK_USER_ID,
    payload: {
        packUserId
    }
})

export const setCardsArrayAC = (cards: Array<CardType>) => ({
    type: ACTIONS_TYPE.SET_CARDS_ARRAY,
    payload: {
        cards
    }
})


export const getAllCardsTS = (packId: string) => {
    return (dispatch: Dispatch, getState :  () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'))
        // create sort field
        let sortCards
        // get query paramas from store
        let {
            page, pageCount, minGrade,
            maxGrade, cardsTotalCount,
            sortField, isSortTypeAscending
        } = getState().card;

        if (sortField) {
            sortCards = +isSortTypeAscending + sortField;
        }
        // create query object
        const cardsQueryObject: GetCardQueryType = {
            params: {
                cardsPack_id: packId,
                ...(page && {page: page}),
                ...(pageCount && {pageCount: pageCount}),
                ...(minGrade && {min: minGrade}),
                ...(maxGrade && {max: maxGrade}),
                ...(cardsTotalCount && {cardsTotalCount: cardsTotalCount}),
                ...(sortCards && {sortCards: sortCards}),
            }
        }
        acsessAPI.getAllCards(cardsQueryObject)
            .then(res => {
                if (res.data && res.data.cards.length > 0) {
                    dispatch(setCardsArrayAC(res.data.cards))
                } else {
                    dispatch(setCardsArrayAC([]))
                }
                dispatch(setPageAC(res.data.page))
                dispatch(setPageCountAC(res.data.pageCount))
                dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
                dispatch(setPackUserIdAC(res.data.packUserId))
                dispatch(setMinGradeAC(res.data.minGrade))
                dispatch(setMaxGradeAC(res.data.maxGrade))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setMessageErrorAC('Something went wrong'))
                /*
                if (error.response && error.response.status) {
                    dispatch(setMessageErrorAC(error.response.data.error))
                } else {
                    dispatch(setMessageErrorAC("Something went wrong"))
                    dispatch(setPassRequestAC(false))
                    if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                }
                */

            })
    }
}

/*
export const getAllPack = (queryPackObject: GetPackQueryParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        acsessAPI.getCardPacks(queryPackObject)
            .then(res => {
                if (res.data && res.data.cardPacks.length > 0) {
                    dispatch(setCardsPackAC(res.data.cardPacks))
                    /!*   const cardsPackWithDate = res.data.cardPacks.map((pack: PackResponseDataType) => {
                           return {
                               ...pack,
                               created: new Date(pack.created),
                               updated: new Date(pack.updated)
                           }
                       })*!/
                    /!*dispatch(setCardsPackAC(cardsPackWithDate))*!/
                } else {
                    dispatch(setCardsPackAC([]))
                }

                dispatch(setMaxCardsCountAC(res.data.maxCardsCount))
                dispatch(setMinCardsCountAC(res.data.minCardsCount))
                dispatch(setPageAC(res.data.page))
                dispatch(setPageCountAC(res.data.pageCount))
                dispatch(setCardsPackTotalCountAC(res.data.cardPacksTotalCount))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setMessageErrorAC('Something went wrong'))
                /!*if (error.response && error.response.status) {
                    dispatch(setMessageErrorAC(error.response.data.error))
                } else {
                    dispatch(setMessageErrorAC("Something went wrong"))
                    dispatch(setPassRequestAC(false))
                    if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                }*!/

            })
    }
}
*/

/*export const deletePackByIdTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        acsessAPI.deleteCardsPacks(id)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(err => {
                console.log(err)
                dispatch(setAppStatusAC('failed'))
            })
    }
}*/

/*export const addNewPackTC = (packObject: NewPackObjectDataType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        acsessAPI.postCardPacks(packObject)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(err => {
                console.log(err)
                dispatch(setAppStatusAC('failed'))
            })
    }
}*/

/*
export const updateCardPack = (packUpdateObject: PackUpdateObjectType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        acsessAPI.updateCardPacks(packUpdateObject)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
            })
            .then(err => {
                console.log(err)
                dispatch(setAppStatusAC('failed'))
            })
    }
}*/
