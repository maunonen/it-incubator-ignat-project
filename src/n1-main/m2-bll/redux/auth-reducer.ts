import {acsessAPI, UserProfileType} from "../../m3-dal/Api";
import {Dispatch} from 'redux';
import {setAppErrorAC, setAppStatusAC, setMessageErrorAC} from "./app-reducer";


export type InitStateType = typeof initState;

const initState = {
    isLoggedIn: false,
    error: "",
    email: "",
    password: "",
    isFetching: true,
    isPassRequestSent: false,
    isPassChanged: false,
    _id: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: "",
    update: "",
    isAdmin: false,
    verified: false,
    rememberMe: false,
};

export const authReducer = (state: InitStateType = initState, action: CombinedActionType): InitStateType => {
    switch (action.type) {
        case "IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value, error: action.error};
        }
        case "SIGN_UP":
            return {
                ...state,
                email: action.email,
                password: action.password,
                error: action.message as string,
            };
        case "IS_FETCHING":
            return {
                ...state, isFetching: action.isFetching
            }
        case "RESTORE/SET-PASS-REQUEST" : {
            return {...state, isPassRequestSent: action.value}
        }
        case "RESTORE/SET-PASS-CHANGED" : {
            return {...state, isPassChanged: action.value}
        }
        case "ADD-PROFILE": {
            return {...state, ...action.value};
        }
        default:
            return state;
    }
};

type CombinedActionType = LoggedInType
    | SignupActionType
    | SetIsFetchingSignupActionType
    | SetPassRequestType
    | SetPassChangedType
    | profileACType;

export type LoggedInType = ReturnType<typeof loggedInAC>;
export type SignupActionType = ReturnType<typeof signupAC>;
export type SetIsFetchingSignupActionType = ReturnType<typeof setIsFetchingSignupAC>;
export type SetPassRequestType = ReturnType<typeof setPassRequestAC>
export type SetPassChangedType = ReturnType<typeof setPassChangedAC>
export type profileACType = ReturnType<typeof profileAC>

export const loggedInAC = (value: boolean, error: string) =>
    ({type: "IS-LOGGED-IN", value, error} as const);

export const signupAC = (email: string, password: string, message?: string) =>
    ({type: 'SIGN_UP', email, password, message} as const);

export const setIsFetchingSignupAC = (isFetching: boolean) =>
    ({type: 'IS_FETCHING', isFetching} as const);

export const setPassRequestAC = (value: boolean) => ({type: "RESTORE/SET-PASS-REQUEST", value} as const);
export const setPassChangedAC = (value: boolean) => ({type: "RESTORE/SET-PASS-CHANGED", value} as const);

export const profileAC = (value: UserProfileType) => ({type: "ADD-PROFILE", value} as const);

// thunks-------------------------------------------------------------------

export const loggedInTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        acsessAPI.loginUser(email, password, rememberMe)
            .then((res) => {
                dispatch(profileAC(res.data))
                dispatch(loggedInAC(true, ""))
            })
            .catch(rej => {
                //    if has response and has data
                if (rej.response?.data) {
                    dispatch(loggedInAC(false, rej.response.data.error))
                } else {
                    dispatch(loggedInAC(false, "network error"))
                }
            })
    }
}

export const logoutTC = () => (dispatch: Dispatch<CombinedActionType>) => {
    acsessAPI.logoutUser()
        .then(res => {
            //  dispatch(profileAC(res.data))
            dispatch(loggedInAC(false, ""))
        }).catch((rej) => {
        // if (rej.response.data){
        // console.log(rej.response.data.error)
        dispatch(loggedInAC(false, rej.response.data.error))
    })
}


export const authMeTC = () => {
    return (dispatch: Dispatch<CombinedActionType>) => {
        acsessAPI.authUser()
            .then((res) => {
                dispatch(profileAC(res.data))
                dispatch(loggedInAC(true, ""))
                dispatch(setIsFetchingSignupAC(false))
            }).catch(rej => {
                       dispatch(loggedInAC(false, ""))
                       dispatch(setIsFetchingSignupAC(false))
            const error = rej.response
                ? rej.response.data.error
                : (rej.message + ', more details in the console');
            console.log(error)
        })
    }
}

export const registrationThunk = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        acsessAPI.registrationUser(email, password)
            .then(() => {
                dispatch(signupAC(email, password));
                dispatch(setIsFetchingSignupAC(true));
            })
            .catch(error => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))
                const message = error.response.data.error
                dispatch(signupAC(email, password, message))
                //  dispatch(setAppErrorAC(error.message))
                //   dispatch(setAppStatusAC("failed"))
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
                dispatch(setAppErrorAC(error.message))
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
                dispatch(setAppErrorAC(error.message))
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
