import {acsessAPI} from "../../m3-dal/Api";
import {Dispatch} from 'redux';

type InitStateType = {
    isLoggedIn: boolean
    errorMessage: string
    isPassRequestSent: boolean
    isPassChanged: boolean
    appStatus: AppStatusType
};

const initState: InitStateType = {
    isLoggedIn: false,
    isPassRequestSent: false,
    isPassChanged: false,
    errorMessage: '',
    appStatus: 'idle'
};

// export type InitialStateType  = typeof initState

export const authReducer = (state = initState, action: CombinedActionType): InitStateType => {
    switch (action.type) {
        case "IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value};
        }
        case "SET-ERROR-MESSAGE": {
            return {...state, errorMessage: action.errorMessage}
        }
        case "SET-PASS-REQUEST" : {
            return {...state, isPassRequestSent: action.value}
        }
        case "SET-PASS-CHANGED" : {
            return {...state, isPassChanged: action.value}
        }
        case "SET-APP-STATUS" : {
            return {...state,}
        }
        default:
            return state;
    }
};

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type CombinedActionType =
    SetLoggedInType
    | SetMessageErrorActionType
    | SetPassRequestType
    | SetAppStatusType
    | SetPassChangedType

export const setMessageErrorAC = (errorMessage: string) => ({type: "SET-ERROR-MESSAGE", errorMessage} as const)
export const loggedInAC = (value: boolean) => ({type: "IS-LOGGED-IN", value} as const);
export const setPassRequestAC = (value: boolean) => ({type: "SET-PASS-REQUEST", value} as const);
export const setPassChangedAC = (value: boolean) => ({type: "SET-PASS-CHANGED", value} as const);
export const setAppStatusAC = (value: AppStatusType) => ({type: "SET-APP-STATUS", value} as const);

export type SetMessageErrorActionType = ReturnType<typeof setMessageErrorAC>
export type SetLoggedInType = ReturnType<typeof loggedInAC>
export type SetPassRequestType = ReturnType<typeof setPassRequestAC>
export type SetPassChangedType = ReturnType<typeof setPassChangedAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>


// thunks-------------------------------------------------------------------

export const loggedInTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch<any>) => {
        //@ts-ignore
        let userData = acsessAPI.loginUser(email, password, rememberMe)
            .then((res) => {
                console.log(res.data)
                dispatch(loggedInAC(true))
            })
    }
}


export const setNewPasswordTC = (password: string, resetPasswordToken: string) => {

    return (dispatch: Dispatch<any>) => {
        dispatch(setAppStatusAC('loading'))
        acsessAPI.setNewPassword(password, resetPasswordToken)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setPassChangedAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                }
            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                if (error.response && error.response.status) {
                    if (error.response?.data?.error) {
                        dispatch(setMessageErrorAC(error.response.data.error))
                    } else {
                        dispatch(setMessageErrorAC('Something went wrong'))
                    }
                } else {
                    dispatch(setMessageErrorAC('Something went wrong'))
                }
            })
    }
}

export const forgotPassTC = (email: string) => {
    return (dispatch: Dispatch<any>) => {

        const from = "santari33@gmail.com";
        const message = "<div>password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>";
        dispatch(setAppStatusAC('loading'))
        acsessAPI.forgotPassword(email, from, message)
            .then((res) => {
                console.log('Thunk', res)
                if (res.data.success) {
                    dispatch(setPassRequestAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                }
            })
            .catch(error => {
                console.log('Thunk error', error)
                dispatch(setAppStatusAC('failed'))
                if (error.response && error.response.status) {
                    dispatch(setMessageErrorAC(error.response.data.error))
                    dispatch(setPassRequestAC(false))
                    /*if (error.response.status === 404) {
                        // Request made and server responded
                        /!*console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);*!/
                        dispatch(setMessageErrorAC(error.response.data.error))
                        dispatch(setPassRestoredAC(false))

                    } else if (error.response.status === 400) {
                        dispatch(setMessageErrorAC(error.response.data.error))
                        dispatch(setPassRestoredAC(false))
                    } else if (error.response.status === 500) {
                        dispatch(setMessageErrorAC(error.response.data.error))
                        dispatch(setPassRestoredAC(false))
                    }*/
                } else {
                    dispatch(setMessageErrorAC("Something went wrong"))
                    dispatch(setPassRequestAC(false))
                    if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                }
            })
    }
}
