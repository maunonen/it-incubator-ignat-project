import {
    acsessAPI,
    GetPackQueryParamsType,
    GetPackResponseWithDateType,
    PackDataType,
    PackResponseDataType
} from "../../m3-dal/Api";
import {AppStatusType, setAppStatusAC, setMessageErrorAC} from "./app-reducer";
import {Dispatch} from "redux";

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
    cardsPack: Array<PackDataType>,
    /*Query params*/
    packName: string
    // minCardsCount
    min: number
    // maxCardsCount
    max: number
    // sort params
    //sortPacks: string
    isSortTypeAscending: boolean
    sortField: PackSortFieldType | null
    page: number
    pageCount: number
    user_id: string
    /* getting from server */
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}

const initialPackState: InitialPackStateType = {
    cardsPack: [],
    packName: '',
    min: 0,
    max: 0,
    isSortTypeAscending: false,
    sortField: null,
    user_id: '',
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
}


export const packReducer = (state: InitialPackStateType = initialPackState, action: CombinedActionType): InitialPackStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_PACK_NAME:
        case ACTIONS_TYPE.SET_PACK_MAX:
        case ACTIONS_TYPE.SET_PACK_MIN:
        case ACTIONS_TYPE.SET_PACK_PAGE:
        case ACTIONS_TYPE.SET_PACK_PAGE_COUNT:
        case ACTIONS_TYPE.SET_PACK_USER_ID:
        case ACTIONS_TYPE.SET_CARDS_PACK:
        case ACTIONS_TYPE.SET_PACK_SORT_TYPE:
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

export type PackSortFieldType = 'updated' | 'name' | 'created' |
    'cardsCount' | 'grade' | 'shots' | 'rating' | 'user_name' |
    'shots' | 'type' | 'private'

/*export const SETPackSortFieldType = ( sortField: PackSortFieldType) => ({
    type: ACTIONS_TYPE.SET_PACK_SORT_FIELD,
    payload: {
        sortField
    }
})*/

export const setPackSortType = (isSortTypeAscending: boolean, sortField: PackSortFieldType) => ({
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

export const setCardsPackAC = (cardsPack: Array<PackDataType>) => ({
    type: ACTIONS_TYPE.SET_CARDS_PACK,
    payload: {
        cardsPack
    }
})

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
export const setPackNameAC = (packName: string) => ({
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

export const addNewPack = (queryPackObject: GetPackQueryParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        acsessAPI.getCardsPack(queryPackObject)
            .then(res => {
                if (res.data && res.data.cardsPack.length > 0) {
                    const cardsPackWithDate = res.data.cardsPack.map((pack: PackResponseDataType) => {
                        return {
                            ...pack,
                            created: new Date(pack.created),
                            updated: new Date(pack.updated)
                        }
                    })
                    dispatch(setCardsPackAC(cardsPackWithDate))
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
            .catch(err => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setMessageErrorAC('Something went wrong'))
            })
    }
}

/*export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        //@ts-ignore
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers([...data.items]))
            dispatch(setTotalUsersCount(data.totalCount))
        }).catch((err: any) => {
            console.log(err)
            dispatch(toggleIsFetching(false))
        });
    }
}*/


/*
const getEventsWithDateType = (events : Array<EventsDataType>) : Array<EventType> => {
    return events.map(event => {
            return {
                ...event,
                endDate: new Date(event.endDate),
                startDate: new Date(event.startDate)
            }
        }
    )
}
*/




