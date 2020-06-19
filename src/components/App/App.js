import React, { Component } from 'react';
import './App.css';
import AHomeList from '../AHomeList/AHomeList';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <p>Empty Page</p>
        <AHomeList/>
      </div>
    );
  }
}

export default App;
