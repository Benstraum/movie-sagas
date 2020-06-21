import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import './DSearchPage.css'

class DSearchPage extends Component {
    componentDidMount() {
        console.log('in search', this.props.query)
    }
    showDetails = (movie) => {
        this.props.dispatch({ type: 'SET_DETAILS', payload: movie })
        this.props.history.push(`/details/${movie.title}`)
        localStorage.setItem('id', movie.id)
        localStorage.setItem('title', movie.title)
        localStorage.setItem('poster', movie.poster)
        localStorage.setItem('description', movie.description)
    }

    render() {
        return (<div className="centerSearch">
            <div className='searchBar'>
                <h1>Search Results!</h1>
                <IconButton
                    color="secondary"
                    onClick={() => this.props.history.push('/')}>
                        <HomeIcon/>
                    </IconButton>
            </div>
            <div className="showDetail">
                {this.props.query.map((movie) => (
                    <div key={movie.id} className="movie">
                        <Paper key={movie.id} elevation={3}>
                            <div className="innerMovie" onClick={() => this.showDetails(movie)}>
                                <img src={movie.poster} alt={movie.title} />
                                <p><b>Genres</b>: <br />{movie.array_agg.join(', ')}</p>
                            </div>
                        </Paper>
                    </div>
                ))}
                <br />
            </div>
        </div>
        )
    }
}
const mapReduxStateToProps = (reduxState) => ({
    query: reduxState.query
});

export default connect(mapReduxStateToProps)(DSearchPage);

