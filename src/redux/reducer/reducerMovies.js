import { UPDATE_MOVIES } from "../actions";


const initialData = {
    dataMovies: []
}

const reducerMovies = (state = initialData, actions)=>{
    switch(actions.type){
        case UPDATE_MOVIES:
            return {
                ...state,
                dataMovies: actions.dataMovies
            };
        default:
            return state;
    }
}

export default reducerMovies;