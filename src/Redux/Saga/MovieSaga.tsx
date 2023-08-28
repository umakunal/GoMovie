import {takeLatest, put, call, fork} from 'redux-saga/effects';
import {
  nowPlayingMovieListFailure,
  nowPlayingMovieListSuccess,
  popularMovieListFailure,
  popularMovieListSuccess,
  upcomingMovieListFailure,
  upcomingMovieListSuccess,
  searchedMovieListFailure,
  searchedMovieListSuccess,
  movieDetailsFailure,
  movieDetailsSuccess,
  movieCastFailure,
  movieCastSuccess,
} from '../Reducers/MovieReducer';
import {GetApi, ResponseGenerator} from '../../Helper/ApiHelper';
import {
  movieCastDetails,
  movieDetails,
  nowPlayingMovies,
  popularMovies,
  searchMovies,
  upcomingMovies,
} from '../../api/apicalls';

function* getNowPlayingMoviesSaga() {
  try {
    const response: ResponseGenerator = yield call(GetApi, nowPlayingMovies);
    console.log('getNowPlayingMovies Response===>', response);
    if (response?.status == 200) {
      yield put(nowPlayingMovieListSuccess(response?.data?.results));
    } else {
      yield put(nowPlayingMovieListFailure(response?.data));
    }
  } catch (e) {
    console.log(e);
    yield put(nowPlayingMovieListFailure(e));
  }
}

function* getPopularMoviesListSaga() {
  try {
    const response: ResponseGenerator = yield call(GetApi, popularMovies);
    console.log('getPopularMoviesList Response===>', response);
    if (response?.status == 200) {
      yield put(popularMovieListSuccess(response?.data?.results));
    } else {
      yield put(popularMovieListFailure(response?.data));
    }
  } catch (e) {
    console.log(e);
    yield put(popularMovieListFailure(e));
  }
}

function* getUpcomingMoviesSaga() {
  try {
    const response: ResponseGenerator = yield call(GetApi, upcomingMovies);
    console.log('getUpcomingMovies Response===>', response);
    if (response?.status == 200) {
      yield put(upcomingMovieListSuccess(response?.data?.results));
    } else {
      yield put(upcomingMovieListFailure(response?.data));
    }
  } catch (e) {
    console.log(e);
    yield put(upcomingMovieListFailure(e));
  }
}

function* searchedMovieSaga({payload}: any) {
  console.log('searchedMovie payload===>', payload?.movieName);
  let searchedMovieUrl = searchMovies(payload?.movieName);
  try {
    const response: ResponseGenerator = yield call(GetApi, searchedMovieUrl);
    console.log('searchedMovie Response===>', response);
    if (response?.status == 200) {
      yield put(searchedMovieListSuccess(response?.data?.results));
    } else {
      yield put(searchedMovieListFailure(response?.data));
    }
  } catch (e) {
    console.log(e);
    yield put(searchedMovieListFailure(e));
  }
}

function* movieDetailsSaga({payload}: any) {
  console.log('movieDetails payload===>', payload?.movieId);
  let movieDetailsUrl = movieDetails(payload?.movieId);
  try {
    const response: ResponseGenerator = yield call(GetApi, movieDetailsUrl);
    console.log('movieDetails Response===>', response);
    if (response?.status == 200) {
      yield put(movieDetailsSuccess(response?.data));
    } else {
      yield put(movieDetailsFailure(response?.data));
    }
  } catch (e) {
    console.log(e);
    yield put(movieDetailsFailure(e));
  }
}

function* movieCastSaga({payload}: any) {
  console.log('movieCast payload===>', payload?.movieId);
  let movieCastUrl = movieCastDetails(payload?.movieId);
  try {
    const response: ResponseGenerator = yield call(GetApi, movieCastUrl);
    console.log('movieCast Response===>', response);
    if (response?.status == 200) {
      yield put(movieCastSuccess(response?.data));
    } else {
      yield put(movieCastFailure(response?.data));
    }
  } catch (e) {
    console.log(e);
    yield put(movieCastFailure(e));
  }
}

function* movieSaga() {
  yield takeLatest(
    'Movies/nowPlayingMovieListRequest',
    getNowPlayingMoviesSaga,
  );
  yield takeLatest('Movies/popularMovieListRequest', getPopularMoviesListSaga);
  yield takeLatest('Movies/upcomingMovieListRequest', getUpcomingMoviesSaga);
  yield takeLatest('Movies/searchedMovieListRequest', searchedMovieSaga);
  yield takeLatest('Movies/movieDetailsRequest', movieDetailsSaga);
  yield takeLatest('Movies/movieCastRequest', movieCastSaga);
}

export const movieSagas = [fork(movieSaga)];
