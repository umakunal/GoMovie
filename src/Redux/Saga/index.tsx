import {all} from 'redux-saga/effects';
import {movieSagas} from './MovieSaga';

const combineSagas = [...movieSagas];
export default function* rootSaga() {
  yield all(combineSagas);
}
