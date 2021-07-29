import {acsessAPI} from "../../m3-dal/Api";
import {Dispatch} from 'redux';

export type UserProfileType = {
    _id:string;
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number
}

const initState:UserProfileType = {_id:"",
                                    email: "",
                                    name: "",
                                    avatar: "",
                                    publicCardPacksCount: 0};

export const profileReducer = (state = initState, action: profileACType): UserProfileType => {
    switch (action.type) {
        case "ADD-PROFILE": {
            return {...state, ...action.value};
        }
        default:
            return state;
    }
};

export type profileACType = {
    type: 'ADD-PROFILE'
    value: UserProfileType
}

// type CombinedActionType = LoggedInType

export const profileAC = (value: UserProfileType): profileACType => ({type: "ADD-PROFILE", value});

// thunks-------------------------------------------------------------------

// export const loggedInTC = (email: string, password: string, rememberMe: boolean) => {
//     return (dispatch: Dispatch<any>) => {
//         //@ts-ignore
//         acsessAPI.loginUser(email, password, rememberMe)
//             .then((res) => {
//                 console.log(res.data)
//                 dispatch(loggedInAC(true, ""))
//             }).catch(rej => {
//             dispatch(loggedInAC(false, rej.response.data.error))
//         })
//     }
// }
