import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Header.css'
class Header extends Component {
  render() {
    return (<>
          <div className='navBar'>
            <ol>
              <li >
                <h2>Playing Now In Theaters Near You</h2>
              </li>
            </ol>
          </div>
      <br />
    </>
    )
  }
}
export default connect()(Header)