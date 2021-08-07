import {combineReducers, createStore, applyMiddleware} from "redux"
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {appReducer} from "./app-reducer";
import {packReducer} from "./pack-reducer";
import {cardReducer} from "./card-reducer";



const reducers = combineReducers({
    auth: authReducer,
    app : appReducer,
    pack : packReducer,
    card : cardReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
// window.store = store; // for dev
