import {acsessAPI} from "../../m3-dal/Api";
import {Dispatch} from 'redux';
import {setAppStatusAC, setMessageErrorAC} from "./app-reducer";

type InitStateType = {
    isLoggedIn: boolean
};

const initState: InitStateType = {
    isLoggedIn: false,
};


export const authReducer = (state = initState, action: CombinedActionType): InitStateType => {
    switch (action.type) {
        case "IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value};
        }
        default:
            return state;
    }
};


type CombinedActionType = SetLoggedInType

export const loggedInAC = (value: boolean) => ({type: "IS-LOGGED-IN", value} as const);

export type SetLoggedInType = ReturnType<typeof loggedInAC>


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
