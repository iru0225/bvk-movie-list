import { useState } from "react"
import { useAsync } from "react-async"
import { useNavigate, useParams } from "react-router-dom"
import { Genre, MovieDetailsType } from "../../shared/types"
import { getMovieDetails } from "../../shared/api/movies.api"
import { ActionButton, BackButton, Badge, Container, ContentWrapper, Overlay, ScoreWrapper, Text, Title } from "./styled"
import { IMAGE_BASE_URL, POSTER_IMAGE_SIZES } from "../../shared/constants"
import { useAppSelector } from "../../shared/hook"
import { wathcedMovieAction, wathcedMoviesSelector } from "../../shared/redux/movie-list.slice"
import { useDispatch } from "react-redux"
import useOnlineChecker from "../../shared/hooks/use-online-checker"

const DetailsPage = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const { id } = useParams()
  const watchedList = useAppSelector(wathcedMoviesSelector)
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | {[_key: string]: any}>({})
  const isWatched = watchedList.movies.find(({ id: movieId }) => movieId === Number(id))
  const isOnline = useOnlineChecker()

  useAsync(async () => {
    if (isOnline) {
      const response = await getMovieDetails(Number(id))
      setMovieDetails(() => response)
    }
  }, [id, isOnline])

  const handleClick = (id: number) => {
    if (isWatched) {
      return dispatch(wathcedMovieAction.removeWatchedList({ id }))
    }
    dispatch(wathcedMovieAction.addWachedList(movieDetails))
  }

  const handleBack = () => {
    navigation('/', { replace: true })
  }

  if (!isOnline) {
    return <h1>
      Your device didn't have any network connection
    </h1>
  }
  
  return (
    <Container bgsrc={movieDetails.backdrop_path ? `${IMAGE_BASE_URL}/original${movieDetails.backdrop_path}` : ''}>
      <BackButton
        onClick={handleBack}
      >
        Back
      </BackButton>
      <Overlay />
      <ContentWrapper>
        <img
          src={`${IMAGE_BASE_URL}${POSTER_IMAGE_SIZES.LARGE}${movieDetails.poster_path}`}
          alt={movieDetails.title}
          width={250}
          style={{
            margin: '0 auto'
          }}
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <Title>
            {movieDetails.title}
          </Title>
          <div
            style={{
              display: 'flex',
              gap: '8px'
            }}
          >
            <Text>{
              movieDetails?.genres?.map((item: Genre) => item.name).join(', ')
            }</Text>
            {
              isWatched && (
                <Badge>
                  Watched
                </Badge>
              )
            }
          </div>
          <ScoreWrapper>
            <Text>
              Score: {movieDetails.vote_average}
            </Text>
            <ActionButton
              background={isWatched ? '#f70031' : 'green'}
              onClick={() => handleClick(Number(id))}
            >
              { isWatched ? 'Remove from watched list' : 'Add to watched list'}
            </ActionButton>
          </ScoreWrapper>
          <p
            style={{
              color: 'whitesmoke',
            }}
          >
            { movieDetails.overview }
          </p>
        </div>
      </ContentWrapper>

    </Container>
  )
}

export default DetailsPage