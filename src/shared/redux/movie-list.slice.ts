import { createAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../state/store'

const addWachedList = createAction<any>('addWachedList')
const getWatchedList = createAction<any>('getWatchedList')
const removeWatchedList = createAction<any>('removeWatchedList')

interface MoviesState {
  movies: {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    isWatched: boolean
  }[]
}

const initialState = {
  movies: [],
} as MoviesState

export const wathcedMovieSlice = createSlice({
  name: 'wathcedMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWatchedList, (state) => {
      const localData = localStorage.getItem('watchedList')
      const movies = localData ? JSON.parse(localData) : []
      return {
        ...state,
        movies
      }
    })
    builder.addCase(addWachedList, (state, action) => {
      const movies = [
        ...state.movies,
        {
          ...action.payload,
          isWatched: true
        }
      ]

      localStorage.setItem('watchedList', JSON.stringify(movies))
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            ...action.payload,
            isWatched: true
          }
        ]
      }
    })
    builder.addCase(removeWatchedList, (state, action) => {
      const movies = state.movies.filter(({ id }) => id !== action.payload.id)
      localStorage.setItem('removeWatchedList', JSON.stringify(movies))
      return {
        ...state,
        movies
      }
    })
  }
})

const { actions } = wathcedMovieSlice
export const wathcedMovieAction = {
  ...actions,
  addWachedList,
  getWatchedList,
  removeWatchedList
}
export const wathcedMoviesSelector = ({ wathcedMovies }: RootState):MoviesState => wathcedMovies