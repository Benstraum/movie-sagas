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
  }
//this sets local storage when digging into a specific movie for more info or to edit.
  showDetails = (movie) => {
    this.props.dispatch({ type: 'SET_DETAILS', payload: movie })
    this.props.history.push(`/details/${movie.title}`)
    localStorage.setItem('id', movie.id)
    localStorage.setItem('title', movie.title)
    localStorage.setItem('poster', movie.poster)
    localStorage.setItem('description', movie.description)
  }
  render() {
    return (
      //will source out map to other component soon, but this creates every poster you see on the page using a 
      //get call joining together the movies and their genres with array_agg
      <div>
        <Grid container direction="row" justify="center" spacing={8}  >
          {this.props.movies.map((movie) => (
            <div key={movie.id} className="movie">
              <Grid container item xs={12} spacing={0}>
                <Paper key={movie.id} elevation={3}>
                  <div className="innerMovie" onClick={() => this.showDetails(movie)}>
                    <img src={movie.poster} alt={movie.title} />
                    <p><b>Genres</b>: {movie.array_agg.join(',')}</p>
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
const mapReduxStateToProps = (reduxState) => ({
  movies: reduxState.movies
});

export default connect(mapReduxStateToProps)(AHomeList);

