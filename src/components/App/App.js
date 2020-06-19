import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import './App.css';
import AHomeList from '../AHomeList/AHomeList';
import BDetails from '../BDetails/BDetails'
class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={AHomeList}/>
          <Route path="/details" component={BDetails}/>
        </Router>
      </div>
    );
  }
}

export default App;
