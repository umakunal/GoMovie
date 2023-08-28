import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  nowPlayingMoviesList: [],
  upcomingMoviesList: [],
  popularMoviesList: [],
  SearchedMovieList: [],
  movieDetails: null,
  movieCast: null,
  loading: false,
  error: '',
  status: '',
};

const MovieSlice = createSlice({
  name: 'Movies',
  initialState,
  reducers: {
    nowPlayingMovieListRequest: (state, action) => {
      state.loading = true;
      state.status = action.type;
    },
    nowPlayingMovieListSuccess: (state, action) => {
      state.loading = false;
      state.nowPlayingMoviesList = action.payload;
      state.status = action.type;
    },
    nowPlayingMovieListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = action.type;
    },
    upcomingMovieListRequest: (state, action) => {
      state.loading = true;
      state.status = action.type;
    },
    upcomingMovieListSuccess: (state, action) => {
      state.loading = false;
      state.upcomingMoviesList = action.payload;
      state.status = action.type;
    },
    upcomingMovieListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = action.type;
    },
    popularMovieListRequest: (state, action) => {
      state.loading = true;
      state.status = action.type;
    },
    popularMovieListSuccess: (state, action) => {
      state.loading = false;
      state.popularMoviesList = action.payload;
      state.status = action.type;
    },
    popularMovieListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = action.type;
    },

    searchedMovieListRequest: (state, action) => {
      state.loading = true;
      state.status = action.type;
    },
    searchedMovieListSuccess: (state, action) => {
      state.loading = false;
      state.SearchedMovieList = action.payload;
      state.status = action.type;
    },
    searchedMovieListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = action.type;
    },

    movieDetailsRequest: (state, action) => {
      state.loading = true;
      state.status = action.type;
    },
    movieDetailsSuccess: (state, action) => {
      state.loading = false;
      state.movieDetails = action.payload;
      state.status = action.type;
    },
    movieDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = action.type;
    },
    movieCastRequest: (state, action) => {
      state.loading = true;
      state.status = action.type;
    },
    movieCastSuccess: (state, action) => {
      state.loading = false;
      state.movieCast = action.payload;
      state.status = action.type;
    },
    movieCastFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = action.type;
    },
  },
});

export const {
  nowPlayingMovieListRequest,
  nowPlayingMovieListSuccess,
  nowPlayingMovieListFailure,
  upcomingMovieListRequest,
  upcomingMovieListSuccess,
  upcomingMovieListFailure,
  popularMovieListRequest,
  popularMovieListSuccess,
  popularMovieListFailure,
  searchedMovieListRequest,
  searchedMovieListSuccess,
  searchedMovieListFailure,
  movieDetailsRequest,
  movieDetailsSuccess,
  movieDetailsFailure,
  movieCastRequest,
  movieCastSuccess,
  movieCastFailure,
} = MovieSlice.actions;
export default MovieSlice.reducer;
