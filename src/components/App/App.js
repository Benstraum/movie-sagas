import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import './App.css';
import AHomeList from '../AHomeList/AHomeList';
import BDetails from '../BDetails/BDetails'
import CEdit from '../CEdit/CEdit';
class App extends Component {
  componentDidMount() {
  }
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route exact path="/" component={AHomeList} />
            <Route exact path="/details/:id" component={BDetails} />
            <Route path="/edit" component={CEdit} />
          </AnimatedSwitch>
        </Router>
      </div>
    );
  }
}

export default App;
