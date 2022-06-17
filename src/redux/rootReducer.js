import { combineReducers } from "redux";
import reducerGenres from './reducer/reducerGenres';
import reducerMovies from "./reducer/reducerMovies";
import reducerSimilarMovies from "./reducer/reducersSimilarMovies";
import reducerFav from "./reducer/reducerFav";


const rootReducer = combineReducers({
    genres: reducerGenres,
    movies: reducerMovies,
    similarMovies : reducerSimilarMovies,
    favs: reducerFav
});

export default rootReducer;