

export const GET_GENRES = "GET_GENRES";
export const UPDATE_GENRES = "UPDATE_GENRES";

export const getGenres = (dataGenres)=>{
    return {
        type: GET_GENRES,
        dataGenres
    }
}

export const updateGenres = (dataGenres)=>{
    return {
        type: UPDATE_GENRES,
        dataGenres
    }
}
