import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HighScores from './HighScores'
import { Button, Typography } from '@mui/material'

const Score = () => {
  const score = useSelector((state) => state.score)
  const highScore = useSelector((state) => state.highScore)
  const difficulty = useSelector((state) => state.difficulty)
  const mode = useSelector((state) => state.mode)
  const [showScore, setShowScore] = useState(false)

  const toggleScores = () => {
    setShowScore(!showScore)
  }

  return (
    <div>
      {difficulty ? (
        <Typography
          variant="h5"
          sx={{ margin: '1rem' }}
        >{`Score: ${score}`}</Typography>
      ) : (
        <>
          <>
            <Button
              variant="text"
              size="large"
              sx={{ margin: '1rem' }}
              onClick={toggleScores}
            >
              High Scores
            </Button>
            {showScore ? <HighScores /> : <></>}
          </>
        </>
      )}
      {highScore[difficulty] && highScore[difficulty][mode] > 0 ? (
        <Typography variant="h5">{`High Score: ${highScore[difficulty][mode]}`}</Typography>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Score
