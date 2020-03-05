import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import api from './services/api';

function App() {

  async function handleClick() {
    const response = await api.get('/volumes?q=harry+potter');

    console.log(response.data.items);
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button onClick={handleClick}>
          Clique em mim!
        </button>
      </header>
    </div>
  );
}

export default App;
