import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CEdit.css'
//mat-ui
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CEdit extends Component {
    componentDidMount() {
        // this uses localstorage to make sure all necessary info still populates
        this.props.dispatch({ type: "SET_DETAILS", payload: this.state.details })
    }

    state = {
        details: {
            id: localStorage.getItem('id'),
            title: localStorage.getItem('title'),
            poster: localStorage.getItem('poster'),
            description: localStorage.getItem('description')
        },
        newTitle: this.props.details.title,
        newDesc: this.props.details.description ,
    }
    //first send necessary info to make db query then it sets reduxstate
    // so the details page is immediately populated with the right info
    handlePut = () => {
        this.props.dispatch({
            type: 'UPDATE_MOVIE',
            payload: {
                id: this.props.details.id,
                description: this.state.newDesc,
                title: this.state.newTitle
            }
        })
        this.props.dispatch({
            type: 'SET_DETAILS',
            payload: {
                id: this.props.details.id,
                title: this.state.newTitle,
                poster: this.props.details.poster,
                description: this.state.newDesc
            }
        })
        localStorage.setItem('title', this.state.newTitle)
        localStorage.setItem('description', this.state.newDesc)
        this.props.history.push(`/details/${this.state.newTitle}`)
    }
    handleOnChange = (event, type) => {
        this.setState({
            ...this.state,
            [type]: event.target.value
        })
    }
    // Renders the entire app on the DOM
    render() {
        let details = this.props.details
        return (
            <div className="CEdit">
                <div className="outerMovie">
                <h1>Something Wrong?</h1>
                    <Grid container direction="row" justify="center" spacing={8}  >
                        <Paper key={details.id} elevation={3} >
                            <div className="detailInner" >
                                <h2>Edit Movie Details</h2>
                                <TextField
                                    id="filled-textarea"
                                    label="Title"
                                    fullWidth
                                    defaultValue={details.title}
                                    variant="filled"
                                    onChange={(event) => this.handleOnChange(event, 'newTitle')}
                                />
                                <br />
                                <TextField
                                    required
                                    id="filled-textarea"
                                    label="Description"
                                    defaultValue={details.description}
                                    fullWidth
                                    multiline
                                    rows={10}
                                    variant="filled"
                                    onChange={(event) => this.handleOnChange(event, 'newDesc')}
                                />
                                <br />
                                <Button variant="outlined"
                                    color="primary"
                                    onClick={() => this.handlePut()}>
                                    Save
                                </Button>
                                < Button variant="outlined"
                                    color="secondary"
                                    onClick={(() => this.props.history.push(`/details/${this.state.newTitle}`))}>Cancel</ Button>
                            </div>
                        </Paper>
                    </Grid>
                </div>
            </div>
        );
    }
}
const mapReduxStateToProps = (reduxState) => ({ details: reduxState.details });

export default connect(mapReduxStateToProps)(CEdit);

