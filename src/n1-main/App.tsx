import React from 'react';
import './App.css';
import Routes from './m1-ui/Routes';
import Header from "./m1-ui/Header/Header";
import AndreiComponent from "./andreiDir/AndreiComponent";

function App() {
    console.log('Render App' )
  return (
    <div className="App">
      <Header/>
      <Routes/>
      <AndreiComponent/>
    </div>
  );
}

export default App;
