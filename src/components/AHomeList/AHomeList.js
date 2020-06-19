import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AHomeList.css'
//mat-ui
import Grid from '@material-ui/core/Grid';

import { Paper } from '@material-ui/core'

class AHomeList extends Component {
  // Renders the entire app on the DOM
  componentDidMount() {
    this.props.dispatch({ type: 'GET_MOVIES' })
    console.log(this.props.reduxState)
  }

  showDetails(movie){
    this.props.dispatch({type:'SET_DETAILS', payload: movie})
    this.props.history.push('/details')
  }
  render() {
    return (
      <div>
        <Grid container direction="row" justify="center" spacing={8}  >
          {this.props.movies.map((movie) => (
            <div key={movie.id} className="movie">
              <Grid container item xs={12} spacing={0}>
                <Paper key={movie.id} elevation={3}>
                  <div className="innerMovie" onClick={()=>this.showDetails(movie)}>
                    <img src={movie.poster} alt={movie.title} />
                  </div>
                </Paper>
              </Grid>
            </div>
          ))}
        </Grid>
      </div>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({ movies: reduxState.movies });

export default connect(mapReduxStateToProps)(AHomeList);

