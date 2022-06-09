import axios from "axios";
import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import { GET_URL_ALL_GENRES, GET_URL_MOVIES_BY_ID_GENRE, GET_URL_SIMILAR_MOVIE, GET_URL_VIDEO } from "../connection/MethodApi";
import {updateGenres,getMovies, GET_GENRES, GET_MOVIES, updateMovies, updateSimilarMovies, GET_SIMILAR_MOVIES, updateVideoMovie} from './actions';


function* getSagaGenres(){

    try{

        const res = yield axios.get(GET_URL_ALL_GENRES());

        yield put(updateGenres(res.data.genres));

    }catch(err){
        console.log(err);
    }
}

function* getSagaMovies(actions){
    try{
        const id = actions.id;
        const res = yield axios.get(GET_URL_MOVIES_BY_ID_GENRE(id));
        yield put(updateMovies(res.data.results));
    }catch(err){
        console.log(err);
    }
}


function* getSagaSimilarMovies(actions){
    try{
        const id = actions.id;
        const res = yield axios.get(GET_URL_SIMILAR_MOVIE(id));
        yield put(updateSimilarMovies(res.data.results));
    }catch(err){
        console.log(err);
    }
}


export default function* rootSaga (){
    yield takeEvery(GET_GENRES, getSagaGenres)
    yield takeEvery(GET_MOVIES,getSagaMovies)
    yield takeEvery(GET_SIMILAR_MOVIES,getSagaSimilarMovies)
}

