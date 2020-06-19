import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BDetails.css'
//mat-ui
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core'

class BDetails extends Component {
    // Renders the entire app on the DOM
    render() {
        let details = this.props.details
        return (<div className="outerMovie">
            <Grid container direction="row" justify="center" spacing={8}  >
            <Paper key={details.id} elevation={3} >
                <div className="detailInner" >
                    <img src={details.poster} alt={details.title} />
                    <div className="textDiv">
                    <p>{details.description}</p>
                    </div>
                    <button onClick={()=>this.props.history.push('/')}>back to movies</button>
                    <button>edit</button>
                </div>
            </Paper>
            </Grid>
        </div>
        );
    }
}
const mapReduxStateToProps = (reduxState) => ({ details: reduxState.details });

export default connect(mapReduxStateToProps)(BDetails);

