import React from 'react';
import './App.css';
import Routes from './m1-ui/Routes';
import Header from "./m1-ui/Header/Header";
import AndreiComponent from "./andreiDir/AndreiComponent";

function App() {
    console.log('Render App' )
  return (
    <div className="App">
        <AndreiComponent/>
        <Header/>
      <Routes/>
    </div>
  );
}

export default App;
