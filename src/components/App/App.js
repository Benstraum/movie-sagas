import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import { Container } from 'semantic-ui-react';
import './App.css';
import AHomeList from '../AHomeList/AHomeList';
import BDetails from '../BDetails/BDetails'
import CEdit from '../CEdit/CEdit';
import Header from '../Header/Header'
import DSearchPage from '../DSearchPage/DSearchPage';
class App extends Component {
  componentDidMount() {
  }
  // Renders the entire app on the DOM
  render() {
    return (
      <Container fluid className="App">
        <Router>  
          <Header/>
          {/* <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          > */}
            <Route exact path="/" component={AHomeList} />
            <Route exact path="/details/:id" component={BDetails} />
            <Route path="/edit" component={CEdit} />
            <Route path="/search/:id" component={DSearchPage}/>
          {/* </AnimatedSwitch> */}
        </Router>
      </Container>
    );
  }
}

export default App;
