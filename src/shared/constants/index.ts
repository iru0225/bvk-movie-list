export const POSTER_IMAGE_SIZES = {
  SMALL: 'w154',
  MEDIUM: 'w342',
  LARGE: 'w780'
}

export const BACK_DROP_SIZES = {
  SMALL: "w300",
  MEDIUM: "w780",
  LARGE: "w1280"
}

export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/'

export const API_URLS = {
  GET_WATHCED_LIST: '/account/{user-id}/watchlist/movies?language=en-US&page={page}&sort_by=created_at.asc',
  GET_POPULAR_LIST: '/movie/popular?language=en-US&page={page}',
  GET_UPCOMING_LIST: '/movie/upcoming?language=en-US&page={page}',
  ADD_OR_REMOVE_WATCHED_LIST: '/account/{user-id}/watchlist',
  GET_MOVIE_DETAILS: '/movie/{movie-id}?language=en-US'
}

export const initialData = {
  movies: [],
  page: 0,
  total_pages: 0,
  total_results: 0
}