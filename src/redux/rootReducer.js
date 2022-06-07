import { combineReducers } from "redux";
import reducerGenres from './reducer/reducerGenres';
import reducerMovies from "./reducer/reducerMovies";
import reducerSimilarMovies from "./reducer/reducersSimilarMovies";


const rootReducer = combineReducers({
    genres: reducerGenres,
    movies: reducerMovies,
    similarMovies : reducerSimilarMovies
});

export default rootReducer;