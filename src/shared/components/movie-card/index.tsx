import { forwardRef } from "react"
import { IMAGE_BASE_URL, POSTER_IMAGE_SIZES } from "../../constants"
import { MovieType } from "../../types"
import MinusIcon from "../icons/minus-icon"
import PlusIcon from "../icons/plus-icon"
import { AddButton, Container, Text } from "./styled"
import { DateTime } from 'luxon'

interface MovieCardProps extends MovieType {
  onClick: (id: number) => void
}

const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(({
  id,
  title,
  release_date,
  poster_path,
  vote_average,
  isWatched,
  onClick
}: MovieCardProps, ref) => {
  return(
    <div
      ref={ref}
      style={{
        position: 'relative'
      }}
    >
      <Container
        to={`/${id}`}
      >
        <img
          src={`${IMAGE_BASE_URL}${POSTER_IMAGE_SIZES.SMALL}${poster_path}`}
          width={Number(POSTER_IMAGE_SIZES.SMALL.match(/\d/g)?.join(''))}
          alt={title}
        />
        <div>
          <Text variant="base">{title}</Text>
          <Text variant="small" type='secondary'>{DateTime.fromFormat(release_date, 'yyyy-mm-dd').toFormat('MMM yyyy')}</Text>
          <Text variant="small" type='secondary'>Score: {vote_average}</Text>
        </div>
      </Container>
      <AddButton onClick={() => onClick(id)}>
        {
          isWatched ? <MinusIcon width={16} height={16}/> : <PlusIcon width={16} height={16} />
        }
      </AddButton>
    </div>
  )
})

export default MovieCard