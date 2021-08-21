import React, {useEffect} from 'react';
import './App.css';
import Routes from './m1-ui/Routes';
import {ErrorSnackbar} from "./m1-ui/ErrorSnackbar/ErrorSnackbar";
import {authMeTC, setIsFetchingSignupAC, InitStateType} from "./m2-bll/redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./m2-bll/redux/store";
import LoginPage from "./m1-ui/Pages/LoginPage";
import UnauthorizedHeader from "./m1-ui/Header/UnauthorizedHeader";
import Header from "./m1-ui/Header/Header";
import preload from "../n1-main/m1-ui/Img/Preloader.gif"


function App() {
    console.log('Render App')

    const dispatch = useDispatch()
    const userProfile = useSelector<AppStoreType, InitStateType>(state => state.auth)

    useEffect(() => {
        if (!userProfile.isLoggedIn) {
            dispatch(authMeTC())
        } else {dispatch(setIsFetchingSignupAC(false))}
    }, [])


  if (!userProfile.isLoggedIn) {
      return (
            userProfile.isFetching
                ? <div><img src={preload} style={{width: 150, display: "block", margin: "auto" }}/></div>
                : <> <UnauthorizedHeader/><Routes/></>
      )
  }
  else {
      return (
          <div className="App">
              <ErrorSnackbar/>
              <Header/>
              <Routes/>
          </div>
      );
  }
}

export default App;
