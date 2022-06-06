import { combineReducers } from "redux";
import reducerGenres from './reducer/reducerGenres';
import reducerMovies from "./reducer/reducerMovies";


const rootReducer = combineReducers({
    genres: reducerGenres,
    movies: reducerMovies
});

export default rootReducer;