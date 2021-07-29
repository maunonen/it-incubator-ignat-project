import {combineReducers, createStore, applyMiddleware} from "redux"
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {appReducer} from "./app-reducer";
import {passRestoreReducer} from "./restore-pass-reducer";


const reducers = combineReducers({
    auth: authReducer,
    app : appReducer,
    passRestore : passRestoreReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
// window.store = store; // for dev
