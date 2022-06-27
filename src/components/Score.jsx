import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'

const Score = () => {
  const score = useSelector((state) => state.score)
  const highScore = useSelector((state) => state.highScore)
  const difficulty = useSelector((state) => state.difficulty)
  const mode = useSelector((state) => state.mode)

  return (
    <div>
      {difficulty ? <p>{`Score: ${score}`}</p> : <></>}
      {highScore[difficulty] && highScore[difficulty][mode] > 0 ? (
        <Typography variant="body">{`High Score: ${highScore[difficulty][mode]}`}</Typography>
      ) : (
        <></>
      )}
      {difficulty ? (
        <></>
      ) : (
        <>
          {highScore.easy.ascending > 0 ||
          highScore.easy.descending > 0 ||
          highScore.easy['ascending & descending'] > 0 ||
          highScore.hard.ascending > 0 ||
          highScore.hard.descending > 0 ||
          highScore.hard['ascending & descending'] > 0 ? (
            <Typography variant="h5">High Scores</Typography>
          ) : (
            <></>
          )}
          {highScore.easy.ascending > 0 ||
          highScore.easy.descending > 0 ||
          highScore.easy['ascending & descending'] > 0 ? (
            <Typography variant="body" sx={{ fontWeight: 'bold' }}>
              Easy
            </Typography>
          ) : (
            <></>
          )}
          {highScore.easy.ascending > 0 ? (
            <Typography variant="body">{`Ascending: ${highScore.easy.ascending}`}</Typography>
          ) : (
            <></>
          )}
          {highScore.easy.descending > 0 ? (
            <Typography variant="body">{`Descending: ${highScore.easy.descending}`}</Typography>
          ) : (
            <></>
          )}
          {highScore.easy['ascending & descending'] > 0 ? (
            <Typography variant="body">{`Ascending & Descending: ${highScore.easy['ascending & descending']}`}</Typography>
          ) : (
            <></>
          )}
          {highScore.hard.ascending > 0 ||
          highScore.hard.descending > 0 ||
          highScore.hard['ascending & descending'] > 0 ? (
            <Typography variant="body" sx={{ fontWeight: 'bold' }}>
              Hard
            </Typography>
          ) : (
            <></>
          )}
          {highScore.hard.ascending > 0 ? (
            <Typography variant="body">{`Ascending: ${highScore.hard.ascending}`}</Typography>
          ) : (
            <></>
          )}
          {highScore.hard.descending > 0 ? (
            <Typography variant="body">{`Descending: ${highScore.hard.descending}`}</Typography>
          ) : (
            <></>
          )}
          {highScore.hard['ascending & descending'] > 0 ? (
            <Typography variant="body">{`Ascending & Descending: ${highScore.hard['ascending & descending']}`}</Typography>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  )
}

export default Score
