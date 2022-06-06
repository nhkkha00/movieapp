

export const GET_GENRES = "GET_GENRES";
export const UPDATE_GENRES = "UPDATE_GENRES";
export const GET_MOVIES = "GET_MOVIES";
export const UPDATE_MOVIES = "UPDATE_MOVIES";

export const getGenres = ()=>{
    return {
        type: GET_GENRES
    }
}

export const updateGenres = (dataGenres)=>{
    return {
        type: UPDATE_GENRES,
        dataGenres
    }
}


export const getMovies = (id)=>{
    return {
        type: GET_MOVIES,
        id
    }
}


export const updateMovies = (dataMovies)=>{
    return {
        type: UPDATE_MOVIES,
        dataMovies
    }
}
