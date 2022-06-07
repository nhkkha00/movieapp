import { UPDATE_SIMILAR_MOVIES } from "../actions";


const initialData = {
    dataSimilarMovies : []
}

const reducerSimilarMovies = (state = initialData, actions)=>{
    switch(actions.type){
        case UPDATE_SIMILAR_MOVIES:
            return {
                ...state,
                dataSimilarMovies: actions.dataMovies
            }
        default:
            return state;
    }
}

export default reducerSimilarMovies;