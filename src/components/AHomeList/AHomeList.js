import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieMapItem from '../MovieMapItem/MovieMapItem'
import './AHomeList.css'
//mat-ui
import { TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Container } from 'semantic-ui-react'
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
  showSearch = (query, result) => {
    this.props.dispatch({ type: 'SET_QUERY', payload: result })
    this.props.history.push(`/search/${query}`);
    console.log('set query fired payload is', result)
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
    if (result.length === 0) {
      this.showSearch("Here's all Movies", this.props.movies)
      Swal.fire({
        title: `We don't have any movie titles that match what you're looking for, Sorry!`,
        width: 600,
        padding: '3em',
        background: `#fff`,
        backdrop: `
          rgba(39, 38, 38,0.8)
        `
      })
    } else {
      this.showSearch(query, result)
    }
    this.setState({
      query: ''
    })

  }
  render() {
    const movies = this.props.movies.slice(0, 5)
    return (
      //will source out map to other component soon, but this creates every poster you see on the page using a 
      //get call joining together the movies and their genres with array_agg
      <Container fluid>
        <div className='AHomeList'>

          <h1>Top Movies In Our Theater Today!</h1>
          <Container fluid>
            <div className="searchBar">
              <TextField
                id="filled-textarea"
                label="Find Other Movies"
                placeholder="Title"
                variant="filled"
                value={this.state.query}
                onChange={(event) => this.handleOnChange(event, 'query')}
              />
              <IconButton aria-label="delete" onClick={this.findMovie}>
                <SearchIcon />
              </IconButton>
            </div>

          </Container>
          <br />
          {movies.map((movie) => (
            <MovieMapItem movie={movie} key={movie.id} showDetails={this.showDetails} />
          ))}
        </div>
      </Container>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  movies: reduxState.movies
});

export default connect(mapReduxStateToProps)(AHomeList);

