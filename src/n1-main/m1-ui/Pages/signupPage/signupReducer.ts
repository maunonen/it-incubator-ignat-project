

const initialState = {
    email: '',
    password: '',
    error: '',
    isFetching: false
};

export const signupReducer = (state: initialStateType, action: signupReducerActionTypes): initialStateType => {
    switch (action.type) {


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


