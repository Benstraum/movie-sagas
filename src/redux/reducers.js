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
const query = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUERY':
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
}
export default { movies, details, genres, query }