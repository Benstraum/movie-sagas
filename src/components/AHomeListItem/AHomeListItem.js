import React, {Component} from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core'

class AHomeListItem extends Component{
    render(){
        let movie = this.props.movies 
        return (
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
        )
    }
}
const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies,
    query: reduxState.query
  });
  
  export default connect(mapReduxStateToProps)(AHomeListItem);