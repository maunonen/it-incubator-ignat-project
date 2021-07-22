

const initState = {
    isLoggedIn : false
};

export type InitialStateType  = typeof initState

export const authReducer = (state = initState, action: CombinedActionType): InitialStateType => { // fix any
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

