import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

class MovieMapItem extends Component {
    render() {
        let movie = this.props.movie
        return (<>
          <Container  key={movie.id}  fluid>
            <div className="movie">
                <div  className="searchBar">
                    <div className="innerMovie" onClick={() => this.props.showDetails(movie)}>
                        <img src={movie.poster} alt={movie.title} />
                        <p><b>Genres</b>: <br />{movie.array_agg.join(', ')}</p>
                    </div>
                </div>
            </div>
            </Container>
        </>
        )
    }
}
export default MovieMapItem