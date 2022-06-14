
import {API_KEY} from './ApiKey';

export const GET_URL_ALL_GENRES = () => {
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
}

export const GET_URL_MOVIES_BY_ID_GENRE = (id) => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`;
}

export const URL_IMG = 'https://image.tmdb.org/t/p';

export const GET_URL_SIMILAR_MOVIE = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`;
}

export const GET_URL_DETAIL_MOVIE = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
}

export const GET_URL_VIDEO_MOVIE = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
}

export const GET_URL_CAST_CREW = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
}

export const URL_VIDEO = 'https://www.youtube.com/watch?v=';