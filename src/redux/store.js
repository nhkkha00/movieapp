import { applyMiddleware, createStore } from "redux";
import { reducerGenres } from "./reduce";
import createSagaMiddleware from "@redux-saga/core";
import { getSagaGenres } from "./sagas";

const  sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducerGenres,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(getSagaGenres);

export default store;