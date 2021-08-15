import {
    acsessAPI,
    GetPackQueryParamsType,
    GetPackResponseWithDateType, NewPackFieldsType, NewPackObjectDataType,
    PackDataType,
    PackResponseDataType, PackUpdateFieldsType, PackUpdateObjectType
} from "../../m3-dal/Api";
import {setAppErrorAC, setAppStatusAC, setMessageErrorAC} from "./app-reducer";
import {AnyAction, Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "./store";


export enum ACTIONS_TYPE {
    SET_CARDS_PACK = 'PackReducer/SET_CARDS_PACK',
    SET_PACK_NAME = 'PackReducer/SET_PACK_NAME',
    SET_PACK_MIN = 'PackReducer/SET_PACK_MIN',
    SET_PACK_MAX = 'PackReducer/SET_PACK_MAX',
    SET_PACK_PAGE = 'PackReducer/SET_PACK_PAGE',
    SET_PACK_PAGE_COUNT = 'PackReducer/SET_PACK_PAGE_COUNT',
    SET_PACK_TOTAL_COUNT = 'PackReducer/SET_PACK_TOTAL_COUNT',
    SET_PACK_USER_ID = 'PackReducer/SET_PACK_USER_ID',
    SET_PACK_SORT_TYPE = 'PackReducer/SET_PACK_SORT_TYPE',
    SET_PACK_SORT_FIELD = 'PackReducer/SET_PACK_SORT_FIELD',
    ADD_NEW_PACK = 'PackReducer/ADD_NEW_PACK',
    GET_PACKS = 'PackReducer/GET_PACKS',
}

export interface InitialPackStateType {
    cardPacks: Array<PackResponseDataType>,
    /*Query params*/
    packName: string | null
    // minCardsCount
    min: number | null
    // maxCardsCount
    max: number | null
    // sort params
    //sortPacks: string
    isSortTypeAscending: boolean
    sortField: keyof PackDataType | null
    page: number
    pageCount: number
    user_id: string | null
    /* getting from server */
    cardPacksTotalCount: number
    /*minCardsCount: number | null
    maxCardsCount: number | null*/
}

const initialPackState: InitialPackStateType = {
    cardPacks: [],
    packName: null,
    // minCardsCount, maxCardsCount
    min: null,
    max: null,
    isSortTypeAscending: false,
    sortField: "updated",
    user_id: null,
    // current page
    page: 0,
    // packs per page
    pageCount: 5,
    // packs total count
    cardPacksTotalCount: 0,
}


export const packReducer = (state: InitialPackStateType = initialPackState, action: CombinedActionType): InitialPackStateType => {
    /*console.log('action type', action.type)*/
    /*console.log('action payload', action.payload)*/
    switch (action.type) {

        case ACTIONS_TYPE.SET_CARDS_PACK:
            /*debugger*/
            return {
                ...state,
                cardPacks: [],
                ...action.payload,
            }
        case ACTIONS_TYPE.SET_PACK_NAME:
        case ACTIONS_TYPE.SET_PACK_MAX:
        case ACTIONS_TYPE.SET_PACK_MIN:
        case ACTIONS_TYPE.SET_PACK_PAGE:
        case ACTIONS_TYPE.SET_PACK_PAGE_COUNT:
        case ACTIONS_TYPE.SET_PACK_USER_ID:
        case ACTIONS_TYPE.SET_PACK_SORT_TYPE:
        case ACTIONS_TYPE.SET_PACK_TOTAL_COUNT:

            return {

                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export const setUserIdAC = (user_id: string) => ({
    type: ACTIONS_TYPE.SET_PACK_USER_ID,
    payload: {
        user_id
    }
})

export const setPackSortType = (isSortTypeAscending: boolean, sortField: keyof PackDataType) => ({
    type: ACTIONS_TYPE.SET_PACK_SORT_TYPE,
    payload: {
        isSortTypeAscending, sortField
    }
})

export const setCardsPackTotalCountAC = (cardPacksTotalCount: number) => ({
    type: ACTIONS_TYPE.SET_PACK_TOTAL_COUNT,
    payload: {
        cardPacksTotalCount
    }
})

export const setCardsPackAC = (cardPacks: Array<PackResponseDataType>) => ({
    type: ACTIONS_TYPE.SET_CARDS_PACK,
    payload: {
        cardPacks
    }
} as const)

export const setPageCountAC = (pageCount: number) => ({
    type: ACTIONS_TYPE.SET_PACK_PAGE_COUNT,
    payload: {
        pageCount
    }
})

export const setPageAC = (page: number) => ({
    type: ACTIONS_TYPE.SET_PACK_PAGE,
    payload: {
        page
    }
})
export const setMaxCardsCountAC = (max: number) => ({
    type: ACTIONS_TYPE.SET_PACK_MAX,
    payload: {
        max
    }
})
export const setMinCardsCountAC = (min: number) => ({
    type: ACTIONS_TYPE.SET_PACK_MIN,
    payload: {
        min
    }
})
export const setPackNameAC = (packName: string | null) => ({
    type: ACTIONS_TYPE.SET_PACK_NAME,
    payload: {
        packName
    }
})

export type CombinedActionType =
    SetPackNameActionType | SetMinCardsCountType |
    SetMaxCardsCountType | SetUserIdType |
    SetPageCountType | SetPageType | SetCardsPackType |
    SetPackSortType


export type SetPackNameActionType = ReturnType<typeof setPackNameAC>
export type SetMinCardsCountType = ReturnType<typeof setMinCardsCountAC>
export type SetMaxCardsCountType = ReturnType<typeof setMaxCardsCountAC>

export type SetUserIdType = ReturnType<typeof setUserIdAC>
export type SetPageCountType = ReturnType<typeof setPageCountAC>
export type SetPageType = ReturnType<typeof setPageAC>
export type SetCardsPackType = ReturnType<typeof setCardsPackAC>
export type setCardsPackTotalCountType = ReturnType<typeof setCardsPackTotalCountAC>

export type SetPackSortType = ReturnType<typeof setPackSortType>
/*export type SETPackSortFieldType = ReturnType<typeof SETPackSortFieldType>*/

export const getAllPack = () => {
    return (dispatch: ThunkDispatch<AppStoreType, {}, AnyAction>, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'))
        let {
            packName, page, pageCount,
            min, max, user_id, sortField,
            isSortTypeAscending,
        } = getState().pack;
              let sortPacks
        // if sortField set create sortPacks field '0created' '1updated'
        if (sortField) {
            sortPacks = +isSortTypeAscending + sortField;
        }
        // create GET query params object from state
        const getPackQueryObject: GetPackQueryParamsType = {
            params: {
                ...(packName !== null && {packName}),
                ...(min !== null && {min}),
                ...(max !== null && {max}),
                ...(page && {page: page}),
                ...(pageCount && {pageCount}),
                ...(user_id !== null && {user_id}),
                ...(sortPacks && {sortPacks: sortPacks}),
            }
        }
        acsessAPI.getCardPacks(getPackQueryObject)
            .then(res => {
                if (res.data && res.data.cardPacks.length > 0) {
                    dispatch(setCardsPackAC(res.data.cardPacks))
                } else {
                    dispatch(setCardsPackAC([]))
                }
                /*dispatch(setMaxCardsCountAC(res.data.maxCardsCount))
                dispatch(setMinCardsCountAC(res.data.minCardsCount))*/
                dispatch(setPageAC(res.data.page))
                dispatch(setPageCountAC(res.data.pageCount))
                dispatch(setCardsPackTotalCountAC(res.data.cardPacksTotalCount))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setMessageErrorAC('Something went wrong'))
            })
    }
}

export const deletePackByIdTC = (packId: string) => {
    return (dispatch: ThunkDispatch<AppStoreType, {}, AnyAction>, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'))
        acsessAPI.deleteCardsPacks(packId)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(getAllPack())
            })
            .catch(error => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))
            })
    }
}

export const addNewPackTC = (addNewPackObject: NewPackFieldsType) => {
    return (dispatch: ThunkDispatch<AppStoreType, {}, AnyAction>, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'))
        const newPackObject: NewPackObjectDataType = {
            cardsPack: {
                ...addNewPackObject
            }
        }
        acsessAPI.postCardPacks(newPackObject)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(getAllPack())
            })
            .catch(error => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))
            })
    }
}

export const updateCardPack = (packId: string, packUpdateObject: PackUpdateFieldsType) => {
    return (dispatch: ThunkDispatch<AppStoreType, {}, AnyAction>) => {
        const updatePackQueryObject = {
            cardsPack: {
                _id : packId,
                ...packUpdateObject
            }
        }
        dispatch(setAppStatusAC('loading'))
        acsessAPI.updateCardPacks(updatePackQueryObject)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(getAllPack())
            })
            .catch(error => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))
            })
    }
}