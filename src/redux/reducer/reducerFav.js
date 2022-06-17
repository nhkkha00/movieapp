import { ADD_FAV,REMOVE_FAV } from "../actions"


const initialData = {
    dataFav: []
}

const reducerFav = (state = initialData, actions)=>{
    switch(actions.type){
        case ADD_FAV:
            return {
                ...state,
                dataFav: [...state.dataFav,actions.newFav]
            }
        case REMOVE_FAV:
            return {
                ...state,
                dataFav: state.dataFav.filter(element => element.id !== actions.id)
            }
        default:
            return state;
    }
}

export default reducerFav;