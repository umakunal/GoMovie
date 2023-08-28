import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './Saga/';
import MovieReducer from './Reducers/MovieReducer';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    movies: MovieReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;
