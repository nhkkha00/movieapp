import axios from "axios";
import {put, takeLatest,takeEvery} from 'redux-saga/effects'
import { GET_ALL_GENRES, GET_MOVIES_BY_ID_GENRE } from "../connection/MethodApi";
import {updateGenres,getMovies, GET_GENRES, GET_MOVIES, updateMovies} from './actions';


function* getSagaGenres(){

    try{

        const res = yield axios.get(GET_ALL_GENRES());

        yield put(updateGenres(res.data.genres));

    }catch(err){
        console.log(err);
    }
}

function* getSagaMovies(actions){
    try{
        const id = actions.id;
        const res = yield axios.get(GET_MOVIES_BY_ID_GENRE(id));
        yield put(updateMovies(res.data.results));
    }catch(err){
        console.log(err);
    }
}


export default function* rootSaga (){
    yield takeEvery(GET_GENRES, getSagaGenres)
    yield takeEvery(GET_MOVIES,getSagaMovies)
}

