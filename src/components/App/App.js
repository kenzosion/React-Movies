import React, { Component } from 'react';
import Header from "../elements/Header/Header";
import Home from "../Home/Home";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Home />
      </React.Fragment>
    );
  }
}

export default App;
