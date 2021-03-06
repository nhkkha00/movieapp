

export const GET_GENRES = "GET_GENRES";
export const UPDATE_GENRES = "UPDATE_GENRES";
export const GET_MOVIES = "GET_MOVIES";
export const UPDATE_MOVIES = "UPDATE_MOVIES";
export const GET_SIMILAR_MOVIES = "GET_SIMILAR_MOVIES";
export const UPDATE_SIMILAR_MOVIES = "UPDATE_SIMILAR_MOVIES";
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";


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


export const getMovies = (id,page)=>{
    return {
        type: GET_MOVIES,
        id,
        page
    }
}

export const addFav = (newFav)=>{
    return {
        type: ADD_FAV,
        newFav
    }
}

export const removeFav = (id)=>{
    return {
        type: REMOVE_FAV,
        id
    }
}

export const updateMovies = (dataMovies,totalPages)=>{
    return {
        type: UPDATE_MOVIES,
        dataMovies,
        totalPages
    }
}

export const getSimilarMovies = (id)=>{
    return {
        type: GET_SIMILAR_MOVIES,
        id
    }
}

export const updateSimilarMovies = (dataMovies)=>{
    return {
        type: UPDATE_SIMILAR_MOVIES,
        dataMovies
    }
}
