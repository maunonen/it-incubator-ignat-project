import React from 'react';
import './App.css';
import Routes from './m1-ui/Routes';
import Header from "./m1-ui/Header/Header";
import Packs from "./m1-ui/Pages/Packs";


function App() {
    console.log('Render App' )
  return (
    <div className="App">
      <Header/>
      <Routes/>
          {/*commit from github.com page interface*/}
    </div>
  );
}

export default App;
