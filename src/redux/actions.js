

export const GET_GENRES = "GET_GENRES";
export const UPDATE_GENRES = "UPDATE_GENRES";

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
