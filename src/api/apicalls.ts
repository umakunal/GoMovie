const apikey: string = '99b16964159f839d3bc0cde81a4466c4';

export const baseUrl = 'https://api.themoviedb.org/3/';
export const baseImagePath = (size: string, path: string) => {
  const imagePath = `https://image.tmdb.org/t/p/${size}${path}`;
  // console.log('imagePath++++++++++++++', imagePath);
  return imagePath;
};

export const nowPlayingMovies: string = `movie/now_playing?api_key=${apikey}`;

export const upcomingMovies: string = `movie/upcoming?api_key=${apikey}`;

export const popularMovies: string = `movie/popular?api_key=${apikey}`;

export const searchMovies = (keyword: string) =>
  `search/movie?api_key=${apikey}&query=${keyword}`;

export const movieDetails = (id: number) => `movie/${id}?api_key=${apikey}`;

export const movieCastDetails = (id: number) => {
  return `movie/${id}/credits?api_key=${apikey}`;
};
