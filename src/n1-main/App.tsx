import React from 'react';
import './App.css';
import Routes from './m1-ui/Routes';
import Header from "./m1-ui/Header/Header";

// my first commit

function App() {
    console.log('Render App' )
  return (
    <div className="App">
        <Header/>
      <Routes/>
    </div>
  );
}

export default App;
