import { UPDATE_GENRES } from "../actions"


const initialData = {
    dataGenres: []
}

const reducerGenres = (state = initialData, actions)=>{
    switch(actions.type){
        case UPDATE_GENRES:
            return {
                ...state,
                dataGenres: actions.dataGenres
            };
        default:
            return state;
    }
}

export default reducerGenres;