import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BDetails.css'
//mat-ui
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core'
import Button from '@material-ui/core/Button';


class BDetails extends Component {
    // Renders the entire app on the DOM
    componentDidMount() {
        this.props.dispatch({ type: 'GET_GENRE_LIST', payload: this.props.details.id })
    }
    render() {
        let details = this.props.details
        return (
            //  Material ui causes minor clogging but all this does is display movie info from reduxstate neatly
            <div className="outerMovie">
                <Grid container direction="row" justify="center" spacing={8}  >
                    <Paper key={details.id} elevation={3} >
                        <div className="detailInner" >
                            <img src={details.poster} alt={details.title} />
                            <div className="textDiv">
                                <div className="genreMap">
                                    <ul>
                                        <li>
                                           <b>Genres</b>:
                                        </li>
                                        {this.props.genres.map(genre => <li key={genre.name}>{genre.name}</li>)}
                                    </ul>
                                </div>
                                <h2>{details.title}</h2>
                                <p>{details.description}</p>
                            </div>
                            {/* these buttons just traverse us between components */}
                            <Button variant="outlined"
                                color="primary"
                                onClick={() => this.props.history.push('/')}>back to movies</Button>
                            < Button variant="outlined"
                                color="secondary"
                                onClick={(() => this.props.history.push('/edit'))}>edit</ Button>
                        </div>
                    </Paper>
                </Grid>
            </div>
        );
    }
}
const mapReduxStateToProps = (reduxState) => ({
    genres: reduxState.genres,
    details: reduxState.details
});

export default connect(mapReduxStateToProps)(BDetails);

