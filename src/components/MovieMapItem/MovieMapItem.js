import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

class MovieMapItem extends Component {
    render() {
        let movie = this.props.movie
        return (<>
            <div key={movie.id} className="movie">
                <Paper key={movie.id} elevation={3}>
                    <div className="innerMovie" onClick={() => this.props.showDetails(movie)}>
                        <img src={movie.poster} alt={movie.title} />
                        <p><b>Genres</b>: <br />{movie.array_agg.join(', ')}</p>
                    </div>
                </Paper>
            </div>
        </>
        )
    }
}
export default MovieMapItem