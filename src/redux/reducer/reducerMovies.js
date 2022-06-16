import { UPDATE_MOVIES } from "../actions";


const initialData = {
    dataMovies: [],
    totalPages: 1
}

const reducerMovies = (state = initialData, actions)=>{
    switch(actions.type){
        case UPDATE_MOVIES:
            return {
                ...state,
                dataMovies: actions.dataMovies,
                totalPages: actions.totalPages
            };
        default:
            return state;
    }
}

export default reducerMovies;