import { combineReducers } from "redux";
import reducerGenres from './reducer/reducerGenres';
import reducerMovies from "./reducer/reducerMovies";
import reducerSimilarMovies from "./reducer/reducersSimilarMovies";
import reducerVideoMovie from './reducer/reducerVideo';


const rootReducer = combineReducers({
    genres: reducerGenres,
    movies: reducerMovies,
    similarMovies : reducerSimilarMovies,
    video: reducerVideoMovie
});

export default rootReducer;