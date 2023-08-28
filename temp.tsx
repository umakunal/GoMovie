// import {all} from 'redux-saga/effects';
// import movieSagas from './MovieSaga';
// const combineSagas = [...movieSagas];
// export default function* rootSaga() {
//   yield all(combineSagas);
// }

// import {takeLatest, put, call, fork} from 'redux-saga/effects';
// import {
//   nowPlayingMovieListFailure,
//   nowPlayingMovieListSuccess,
//   popularMovieListFailure,
//   popularMovieListSuccess,
//   upcomingMovieListFailure,
//   upcomingMovieListSuccess,
// } from '../Reducers/MovieReducer';
// import {GetApi, ResponseGenerator} from '../../Helper/ApiHelper';
// import {
//   nowPlayingMovies,
//   popularMovies,
//   upcomingMovies,
// } from '../../api/apicalls';

// function* getNowPlayingMoviesSaga() {
//   console.log('I am here');
//   try {
//     const response: ResponseGenerator = yield call(GetApi, nowPlayingMovies);
//     console.log('getNowPlayingMovies Response===>', response);
//     if (response?.status == 200) {
//       yield put(nowPlayingMovieListSuccess(response?.data));
//     } else {
//       yield put(nowPlayingMovieListFailure(response?.data));
//     }
//   } catch (e) {
//     console.log(e);
//     yield put(nowPlayingMovieListFailure(e));
//   }
// }

// function* getPopularMoviesListSaga() {
//   try {
//     const response: ResponseGenerator = yield call(GetApi, popularMovies);
//     if (response?.status == 200) {
//       yield put(popularMovieListSuccess(response?.data));
//     } else {
//       yield put(popularMovieListFailure(response?.data));
//     }
//   } catch (e) {
//     console.log(e);
//     yield put(popularMovieListFailure(e));
//   }
// }

// function* getUpcomingMoviesSaga() {
//   try {
//     const response: ResponseGenerator = yield call(GetApi, upcomingMovies);
//     if (response?.status == 200) {
//       yield put(upcomingMovieListSuccess(response?.data));
//     } else {
//       yield put(upcomingMovieListFailure(response?.data));
//     }
//   } catch (e) {
//     console.log(e);
//     yield put(upcomingMovieListFailure(e));
//   }
// }

// const movieSagas = [
//   (function* () {
//     yield takeLatest(
//       'Movies/nowPlayingMovieListRequest',
//       getNowPlayingMoviesSaga,
//     );
//   })(),
//   (function* () {
//     yield takeLatest(
//       'Movies/popularMovieListRequest',
//       getPopularMoviesListSaga,
//     );
//   })(),
//   (function* () {
//     yield takeLatest('Movies/upcomingMovieListRequest', getUpcomingMoviesSaga);
//   })(),
// ];

// export default movieSagas;
