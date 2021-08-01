import {combineReducers, createStore, applyMiddleware} from "redux"
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./auth-reducer";
/*import {signupReducer} from "../../m1-ui/Pages/signupPage/signupReducer";*/
import {appReducer} from "./app-reducer";
import {passRestoreReducer} from "./restore-pass-reducer";
import {profileReducer} from "./profile-reducer";
import {signupReducer} from "../../m1-ui/Pages/signupPage/signupReducer";


const reducers = combineReducers({
    auth: authReducer,
    signup: signupReducer,
    app : appReducer,
    passRestore : passRestoreReducer,
    profile: profileReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
// window.store = store; // for dev
