import { useCallback, useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../shared/hook"
import { getPopularList, getUpcomginMovies } from "../../shared/api/movies.api"
import { MovieType } from "../../shared/types"
import { Container } from "./styled"
import MovieList from "../../shared/components/movie-list"
import { wathcedMovieAction, wathcedMoviesSelector } from "../../shared/redux/movie-list.slice"
import { useDispatch } from "react-redux"
import useOnlineChecker from "../../shared/hooks/use-online-checker"
import { initialData } from "../../shared/constants"

interface MovieListType {
  movies: MovieType[]
  page: number
  total_pages: number
  total_results: number
}

const Home = () => {
  const dispatch = useDispatch()
  const watchedList = useAppSelector(wathcedMoviesSelector)
  const [movieList, setMovieList] = useState<MovieListType>(initialData)
  const [upcomingList, setUpcomingList] = useState<MovieListType>(initialData)
  const [moviePage, setMoviePage] = useState(1)
  const [upcomingPage, setUpcomingPage] = useState(1)
  const onlineStatus = useOnlineChecker()

  const popularMovieObserver = useRef<any>()
  const lastPopularMovie = useCallback((node: any) => {
    if (popularMovieObserver.current) {
      popularMovieObserver.current.disconnect()
    }

    popularMovieObserver.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && (moviePage < movieList.total_pages)) {
        setMoviePage((prevState) => prevState + 1)
      }
    })

    if (node) {
      popularMovieObserver.current.observe(node)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieList])

  const upcomingMovieObserver = useRef<any>()
  const lastUpcomingMovie = useCallback((node: any) => {
    if (upcomingMovieObserver.current) {
      upcomingMovieObserver.current.disconnect()
    }

    upcomingMovieObserver.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && (upcomingPage < upcomingList.total_pages)) {
        setUpcomingPage((prevState) => prevState + 1)
      }
    })

    if (node) {
      upcomingMovieObserver.current.observe(node)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcomingList])

  useEffect(() => {
    dispatch(wathcedMovieAction.getWatchedList('getWatchedList'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (onlineStatus) {
      setMoviePage(() => 1)
      setUpcomingPage(() => 1)
    } else {
      setMoviePage(() => 0)
      setUpcomingPage(() => 0)
      setMovieList(() => initialData)
      setUpcomingList(() => initialData)
    }
  }, [onlineStatus])

  useEffect(() => {
    setMovieList((prevState) => {
      const newState = {...prevState}
      const movies = newState.movies.map((item) => {
        const newObj = {...item}
        if (watchedList.movies.find(({ id }) => id === newObj.id)) {
          newObj.isWatched = true
        } else {
          newObj.isWatched = false
        }
        return newObj
      })
      return {
        ...newState,
        movies
      }
    })

    setUpcomingList((prevState) => {
      const newState = {...prevState}
      const movies = newState.movies.map((item) => {
        const newObj = {...item}
        if (watchedList.movies.find(({ id }) => id === newObj.id)) {
          newObj.isWatched = true
        } else {
          newObj.isWatched = false
        }
        return newObj
      })
      return {
        ...newState,
        movies
      }
    })
  }, [watchedList, movieList.page, upcomingList.page])

  const getMovieList = async (page: number) => {
    try {
      const response = await getPopularList(page)
      setMovieList((prevState) => {
        const moviesArr = [
          ...prevState.movies,
          ...response.results
        ]
        const ids = moviesArr.map(({id}) => id)
        const newState = {
          ...response,
          movies: moviesArr.filter(({id}, index) => !ids.includes(id, index + 1))
        }

        return newState
      })
    } catch (error) {
      return
    }
  }

  const getUpcomingMovie = async (page: number) => {
    try {
      const response = await getUpcomginMovies(page)
      setUpcomingList((prevState) => {
        const moviesArr = [
          ...prevState.movies,
          ...response.results
        ]
        const ids = moviesArr.map(({id}) => id)
        const newState = {
          ...response,
          movies: moviesArr.filter(({id}, index) => !ids.includes(id, index + 1))
        }

        return newState
      })
    } catch (error) {
      return
    }
  }

  useEffect(() => {
    if (movieList.movies.length === 0 || moviePage > 1) {
      getMovieList(moviePage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviePage])

  useEffect(() => {
    if (upcomingList.movies.length === 0 || upcomingPage > 1) {
      getUpcomingMovie(upcomingPage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcomingPage])
  
  const addToWachedList = async (id: number) => {
    const movie = movieList.movies.find(({ id: movie_id }) => movie_id === id) || upcomingList.movies.find(({ id: movie_id }) => movie_id === id)
    if (!movie) return
    if (movie?.isWatched) {
      return dispatch(wathcedMovieAction.removeWatchedList(movie))
    }
    return dispatch(wathcedMovieAction.addWachedList(movie))
  }
  
  return(
    <Container>
      <MovieList
        title="Watched Movies"
        movies={watchedList.movies}
        direction="row"
        onClick={addToWachedList}
      />
      <MovieList
        ref={lastUpcomingMovie}
        title="Upcoming Movies"
        movies={upcomingList.movies.filter(({ isWatched }) => !isWatched)}
        direction="row"
        onClick={addToWachedList}
        isOffline={!onlineStatus}
      />
      <MovieList
        ref={lastPopularMovie}
        title="Popular Movies"
        movies={movieList.movies.filter(({ isWatched }) => !isWatched)}
        direction="column"
        onClick={addToWachedList}
        isOffline={!onlineStatus}
      />
    </Container>
  )
}

export default Home