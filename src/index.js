import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import { takeEvery, put } from 'redux-saga/effects'
// Import saga middleware
import createSagaMiddleware from 'redux-saga';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovies)
    yield takeEvery('GET_DETAILS', getDetails)
    yield takeEvery('UPDATE_MOVIE', updateMovie)
    yield takeEvery('GET_GENRE_LIST', getSpecifiedGenres)
}

function* getMovies() {
    const movieResponse = yield axios.get(`/movies`)
    yield put({ type: 'SET_MOVIES', payload: movieResponse.data });
}
function* updateMovie(action) {
    yield axios.put(`/movies/${action.payload.id}`, action.payload)
    put({ type: 'SET_DETAILS', payload: action.payload })
}
function* getSpecifiedGenres(action){
    const genreResponse = yield axios.get(`/genres/${action.payload}`)
    yield put({ type: 'SET_GENRES', payload: genreResponse.data });
}
function* getDetails(action) {
    const movieResponse = yield axios.get(`/movies/${action.payload}`)
    put({ type: 'SET_DETAILS', payload: movieResponse.data })
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
const details = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            console.log(action.payload)
            return action.payload
        default:
            return state;
    }
}
// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        details,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
