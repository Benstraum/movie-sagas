import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'


function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovies)
    yield takeEvery('UPDATE_MOVIE', updateMovie)
    yield takeEvery('GET_GENRE_LIST', getSpecifiedGenres)
    // yield takeEvery('GET_SEARCH', findMovie)
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
// function* findMovie(action){
//     const findResponse = yield axios.get(`/movies/${action.payload}`, action.payload)
//     yield put({ type: 'SET_QUERY', payload: findResponse.data });
// }
export default rootSaga