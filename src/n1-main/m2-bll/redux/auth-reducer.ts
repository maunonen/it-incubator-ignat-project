import {acsessAPI} from "../../m3-dal/Api";
import {Dispatch} from 'redux';
import {profileAC, profileACType} from './profile-reducer';


export type InitStateType = { isLoggedIn: boolean, error: string };

const initState: InitStateType = {isLoggedIn: false, error: ""};

export const authReducer = (state = initState, action: CombinedActionType): InitStateType => {
    switch (action.type) {
        case "IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value, error: action.error};
        }
        default:
            return state;
    }
};

export type LoggedInType = {
    type: 'IS-LOGGED-IN'
    value: boolean
    error: string
}

type CombinedActionType = LoggedInType | profileACType;

export const loggedInAC = (value: boolean, error: string): LoggedInType => ({type: "IS-LOGGED-IN", value, error});

// thunks-------------------------------------------------------------------

export const loggedInTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch<CombinedActionType>) => {
        acsessAPI.loginUser(email, password, rememberMe)
            .then((res) => {
                dispatch(profileAC(res.data))
                dispatch(loggedInAC(true, ""))
            }).catch(rej => {
            // if (rej.response.data){
            // console.log(rej.response.data.error)
            dispatch(loggedInAC(false, rej.response.data.error))
        })
    }
}


export const authMeTC = () => {
    return (dispatch: Dispatch<CombinedActionType>) => {
        acsessAPI.authUser()
            .then((res) => {
                dispatch(profileAC(res.data))
                dispatch(loggedInAC(true, ""))
            }).catch(rej => {
            dispatch(loggedInAC(false, rej.response.data.error))
        })
    }
}
