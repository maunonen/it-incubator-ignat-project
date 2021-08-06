import React from 'react';
import './App.css';
import Routes from './m1-ui/Routes';
import Header from "./m1-ui/Header/Header";
import {ErrorSnackbar} from "./m1-ui/ErrorSnackbar/ErrorSnackbar";


function App() {
    console.log('Render App')
    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Routes/>
            {/*commit from github.com page interface*/}
        </div>
    );
}

export default App;
