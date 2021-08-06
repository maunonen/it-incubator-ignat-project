import {combineReducers, createStore, applyMiddleware} from "redux"
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./auth-reducer";
/*import {signupReducer} from "../../m1-ui/Pages/signupPage/signupReducer";*/
import {appReducer} from "./app-reducer";



const reducers = combineReducers({
    auth: authReducer,
    app : appReducer,
    pack : packReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
// window.store = store; // for dev
