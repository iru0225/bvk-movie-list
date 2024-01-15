import { forwardRef } from 'react'
import { MovieType } from '../../types'
import MovieCard from '../movie-card'
import { Container, ContentTitle, MoviesContainer } from './styled'

interface MovieListProps {
  movies: MovieType[]
  title: string
  direction: 'column' | 'row'
  onClick: (id: number) => void
  isOffline?: boolean
}

const MovieList = forwardRef<HTMLDivElement, MovieListProps>(({
  movies,
  title,
  direction,
  onClick,
  isOffline
}: MovieListProps, ref) => {
  return(
    <Container direction={direction}>
      <ContentTitle>{ title }</ContentTitle>
      {
        isOffline && (
          <h1>
            Your device didn't have any network connection
          </h1>
        )
      }
      {
        !isOffline && (
          <MoviesContainer direction={direction}>
            {
              movies.map((movie, idx: number) => <MovieCard ref={idx === (movies.length - 1) ? ref : null} onClick={onClick} key={movie.id} {...movie}/>)
            }
          </MoviesContainer>
        )
      }
    </Container>
  )
})

export default MovieList