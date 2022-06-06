import axios from "axios";
import {put} from 'redux-saga/effects'
import API_KEY from "../connection/ApiKey";
import { updateGenres } from "./actions";


export function* getSagaGenres(){

    const str = `
    https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
    `;

    try{
        const res = yield axios.get(str);

        yield put(updateGenres(res.data.genres));

    }catch(err){
        console.log(err);
    }
}

