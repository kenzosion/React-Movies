import React, { Component } from 'react';
import Actor from './components/elements/Actor/Actor';
import FourColGrid from "./components/elements/FourColGrid/FourColGrid";


import './App.css';

class App extends Component {
  render() {
    return (
      <Actor />,
      <FourColGrid />
    );
  }
}

export default App;
