
import API_KEY from './ApiKey';


export const GET_ALL_GENRES = () => {
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
}

export const GET_MOVIES_BY_ID_GENRE = (id) => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`;
}

export const URL_IMG = 'https://image.tmdb.org/t/p';


export const GET_SIMILAR_MOVIE = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
}