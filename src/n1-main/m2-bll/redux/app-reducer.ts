type InitStateType = {
    errorMessage: string | null
    appStatus: AppStatusType
    error: string | null
};

const initState: InitStateType = {
    errorMessage: null,
    appStatus: 'idle',
    error: null
};
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type CombinedActionType = SetMessageErrorActionType
    | SetAppStatusType
    | SetAppErrorActionType

export const appReducer = (state = initState, action: CombinedActionType): InitStateType => {
    switch (action.type) {
        case "APP/SET-ERROR-MESSAGE": {
            return {...state, errorMessage: action.errorMessage}
        }
        case "APP/SET-APP-STATUS" : {
            return {...state, appStatus: action.value}
        }
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state;
    }
};


export const setMessageErrorAC = (errorMessage: string) => ({type: "APP/SET-ERROR-MESSAGE", errorMessage} as const)
export const setAppStatusAC = (value: AppStatusType) => ({type: "APP/SET-APP-STATUS", value} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)


export type SetMessageErrorActionType = ReturnType<typeof setMessageErrorAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>