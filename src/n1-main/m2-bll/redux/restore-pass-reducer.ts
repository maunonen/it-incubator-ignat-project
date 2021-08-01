import {Dispatch} from "redux";
import {setAppStatusAC, setMessageErrorAC} from "./app-reducer";
import {acsessAPI} from "../../m3-dal/Api";

type InitStateType = {
    isPassRequestSent: boolean
    isPassChanged: boolean
};

const initState: InitStateType = {
    isPassRequestSent: false,
    isPassChanged: false,
};

type CombinedActionType = SetPassRequestType | SetPassChangedType


export const passRestoreReducer = (state = initState, action: CombinedActionType): InitStateType => {
    switch (action.type) {
        case "RESTORE/SET-PASS-REQUEST" : {
            return {...state, isPassRequestSent: action.value}
        }
        case "RESTORE/SET-PASS-CHANGED" : {
            return {...state, isPassChanged: action.value}
        }
        default:
            return state;
    }
};

export const setPassRequestAC = (value: boolean) => ({type: "RESTORE/SET-PASS-REQUEST", value} as const);
export const setPassChangedAC = (value: boolean) => ({type: "RESTORE/SET-PASS-CHANGED", value} as const);

export type SetPassRequestType = ReturnType<typeof setPassRequestAC>
export type SetPassChangedType = ReturnType<typeof setPassChangedAC>


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
        dispatch(setAppStatusAC('loading'))
        const from = "santari33@gmail.com";
        const message = "<div>password recovery link: <a href='https://maunonen.github.io/it-incubator-ignat-project/#/set-new-password/$token$'>link</a></div>";

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
