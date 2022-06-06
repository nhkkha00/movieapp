import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from './sagas';
import reducerGenres from "./rootReducer";
import rootReducer from "./rootReducer";


const  sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);


sagaMiddleware.run(rootSaga);

export default store;