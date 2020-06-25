import React, { Component } from 'react'
import MovieMapItem from '../MovieMapItem/MovieMapItem'
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import './DSearchPage.css'

class DSearchPage extends Component {
    componentDidMount() {
        console.log('in search', this.props.query)
    }
    //similar design to my initial homelist component next step is to create reusable map component for these
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
            <div className='homeBar'>
                <h2>This what you're looking for?</h2>
                <IconButton
                    color="secondary"
                    onClick={() => this.props.history.push('/')}>
                    <HomeIcon />
                </IconButton>
            </div>
            <div className="showDetail">
                {this.props.query.map((movie) => (
                    <MovieMapItem movie={movie} key={movie.id} showDetails={this.showDetails}/>
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

