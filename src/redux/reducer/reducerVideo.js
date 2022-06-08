import { UPDATE_VIDEO_MOVIES } from "../actions"

const initialData = {
    keyVideo:''
}

const reducerVideoMovie = (state = initialData, actions)=>{
    switch(actions.type){
        case UPDATE_VIDEO_MOVIES:
            return {
                ...state,
                keyVideo: actions.keyVideo
            }
        default:
            return state;
    }
}

export default reducerVideoMovie;