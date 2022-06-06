import { createStore } from "redux";
import { reducerGenres } from "./reduce";


const store = createStore(reducerGenres);

export default store;