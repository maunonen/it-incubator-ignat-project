import {Dispatch} from "redux";
import {acsessAPI} from "../../../m3-dal/Api";


const initialState = {
    email: '',
    password: '',
    error: '',
    isFetching: false
};

export const signupReducer = (state: initialStateType = initialState, action: signupReducerActionTypes): initialStateType => {
    switch (action.type) {
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

        default:
            return state
    }
}


// Action creators

export const signupAC = (email: string, password: string, message?: string) =>
    ({type: 'SIGN_UP', email, password, message} as const);

export const setIsFetchingSignupAC = (isFetching: boolean) =>
    ({type: 'IS_FETCHING', isFetching }as const);

type initialStateType = typeof initialState;

export type signupReducerActionTypes = SignupActionType | SetIsFetchingSignupActionType;
type SignupActionType = ReturnType<typeof signupAC>;
type SetIsFetchingSignupActionType = ReturnType<typeof setIsFetchingSignupAC>;

// Thunk

export const registrationThunk = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        acsessAPI.registrationUser(email, password)
            .then(() => {
                dispatch(signupAC(email, password));
                dispatch(setIsFetchingSignupAC(true));

            })
            .catch(error => {
                const message = error.response.data.error
                dispatch(signupAC(email, password, message))
            })
    }
}


