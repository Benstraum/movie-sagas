import React, { Component } from 'react'
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './Header.css'
class Header extends Component {
  render() {
    return (<>
      <AppBar position="static">
        <Toolbar>
          <div className='navBar'>
            <ol>
              <li >
                <h2>Playing Now In Theaters Near You</h2>
              </li>
            </ol>
          </div>
        </Toolbar>
      </AppBar>
      <br />
    </>
    )
  }
}
export default connect()(Header)