import {acsessAPI} from "../../m3-dal/Api";
import {Dispatch} from 'redux';

type InitStateType = {isLoggedIn : boolean};

const initState = {isLoggedIn : false};

// export type InitialStateType  = typeof initState

export const authReducer = (state = initState, action: CombinedActionType): InitStateType => {
    switch (action.type) {
        case "IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value};
        }
        default: return state;
    }
};

export type LoggedInType = {
    type : 'IS-LOGGED-IN'
    value : boolean
}

type CombinedActionType = LoggedInType

export const loggedInAC = (value : boolean): LoggedInType => ({ type : "IS-LOGGED-IN", value });

// thunks-------------------------------------------------------------------

export const loggedInTC = (email:string, password:string, rememberMe:boolean) => {
    return (dispatch: Dispatch<any>) => {
        //@ts-ignore
                let userData=acsessAPI.loginUser(email, password, rememberMe)
                    .then((res) => {
                        console.log(res.data)
                        dispatch(loggedInAC(true))
                    })


    }
}
