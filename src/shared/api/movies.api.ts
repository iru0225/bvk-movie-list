import { API_URLS } from '../constants'
import { MovieDetailsType, MovieType } from '../types'

interface MovieResponseType {
  page: number
  total_pages: number
  total_results: number
  results: MovieType[]
}

export const getPopularList = async (page: number): Promise<MovieResponseType> => {
  const url = `${process.env.REACT_APP_BASE_API}${API_URLS.GET_POPULAR_LIST.replace('{page}', `${page}`)}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`
      }
    })
    return response.json()
  } catch (error) {
    return {
      page: 0,
      total_pages: 0,
      total_results: 0,
      results: []
    }
  }
}

export const getUpcomginMovies = async (page: number): Promise<MovieResponseType> => {
  const url = `${process.env.REACT_APP_BASE_API}${API_URLS.GET_UPCOMING_LIST.replace('{page}', `${page}`)}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`
      }
    })
    return response.json()
  } catch (error) {
    return {
      page: 0,
      total_pages: 0,
      total_results: 0,
      results: []
    }
  }
}

export const getMovieDetails = async (id: number): Promise<MovieDetailsType | {}> => {
  const url = `${process.env.REACT_APP_BASE_API}${API_URLS.GET_MOVIE_DETAILS.replace('{movie-id}', `${id}`)}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`
      }
    })
    return response.json()
  } catch (error) {
    return {}
  }
}
