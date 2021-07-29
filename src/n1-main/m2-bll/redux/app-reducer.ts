type InitStateType = {
    errorMessage: string | null
    appStatus: AppStatusType
};

const initState: InitStateType = {
    errorMessage: null,
    appStatus: 'idle'
};
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type CombinedActionType = SetMessageErrorActionType | SetAppStatusType

export const appReducer = (state = initState, action: CombinedActionType): InitStateType => {
    switch (action.type) {
        case "APP/SET-ERROR-MESSAGE": {
            return {...state, errorMessage: action.errorMessage}
        }
        case "APP/SET-APP-STATUS" : {
            return {...state, appStatus: action.value}
        }
        default:
            return state;
    }
};


export const setMessageErrorAC = (errorMessage: string) => ({type: "APP/SET-ERROR-MESSAGE", errorMessage} as const)
export const setAppStatusAC = (value: AppStatusType) => ({type: "APP/SET-APP-STATUS", value} as const);

export type SetMessageErrorActionType = ReturnType<typeof setMessageErrorAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
