import {acsessAPI} from "../../m3-dal/Api";
import {Dispatch} from 'redux';
import {profileAC} from './profile-reducer';

type InitStateType = { isLoggedIn: boolean, error: string };

const initState = {isLoggedIn: false, error: ""};

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

type CombinedActionType = LoggedInType

export const loggedInAC = (value: boolean, error: string): LoggedInType => ({type: "IS-LOGGED-IN", value, error});

// thunks-------------------------------------------------------------------

export const loggedInTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch<any>) => {
        //@ts-ignore
        acsessAPI.loginUser(email, password, rememberMe)
            .then((res) => {
                dispatch(profileAC(res.data))
                dispatch(loggedInAC(true, ""))
            }).catch(rej => {
                // как проверить чтобы ошибка не падала ignat
                // if (rej.response.data){
            dispatch(loggedInAC(false, rej.response.data.error))}
        // }
        )
    }
}
