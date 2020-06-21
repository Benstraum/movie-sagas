import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AHomeList.css'
import AHomeListItem from '../AHomeListItem/AHomeListItem'
//mat-ui
import Grid from '@material-ui/core/Grid';
import { Paper, TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
//sweetalert
import Swal from 'sweetalert2'

class AHomeList extends Component {
  state = {
    query: ''
  }
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

  handleOnChange = (event, type) => {
    this.setState({
      ...this.state,
      [type]: event.target.value
    })
  }
  //this search function takes our query from texfield, uses our reduxstate.movies to filter through and 
  //find if there is a match anywhere in the title. if the result is truthy it will fire a dispatch
  //re using the reducer that originally populated the page bringing up only the query related movies!!
  findMovie = () => {
    let query = this.state.query
    const result = this.props.movies.filter(movie => movie.title.toUpperCase().includes(query.toUpperCase()));
    console.log(result)
    {result &&
   this.props.dispatch({type:'SET_MOVIES', payload: result})
    }
    this.setState({
      query: ''
    })

  }
  render() {
    return (
      //will source out map to other component soon, but this creates every poster you see on the page using a 
      //get call joining together the movies and their genres with array_agg
      <div>
        <Grid container direction="row" justify="center" spacing={8}  >
          <Grid container item justify='center' xs={12} spacing={8} >
            <div className="searchBar">
              <TextField
                id="filled-textarea"
                label="Find Movie"
                placeholder="Title"
                variant="filled"
                value={this.state.query}
                onChange={(event) => this.handleOnChange(event, 'query')}
              />
              <IconButton aria-label="delete" onClick={this.findMovie}>
                <SearchIcon />
              </IconButton>
            </div>
          </Grid>
          {this.props.movies.map((movie) => (
            <div key={movie.id} className="movie">
              <Grid container item xs={12} spacing={0}>
                <Paper key={movie.id} elevation={3}>
                  <div className="innerMovie" onClick={() => this.showDetails(movie)}>
                    <img src={movie.poster} alt={movie.title} />
                    <p><b>Genres</b>: <br />{movie.array_agg.join(', ')}</p>
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

