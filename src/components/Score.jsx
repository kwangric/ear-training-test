import React from 'react'
import { useSelector } from 'react-redux'

const Score = () => {
  const score = useSelector((state) => state.score)
  const highScore = useSelector((state) => state.highScore)
  const difficulty = useSelector((state) => state.difficulty)
  const mode = useSelector((state) => state.mode)

  return (
    <div>
      <p>{`Score: ${score}`}</p>
      {highScore[difficulty] && highScore[difficulty][mode] > 0 ? (
        <p>{`High Score: ${highScore[difficulty][mode]}`}</p>
      ) : (
        <></>
      )}
      {difficulty ? (
        <></>
      ) : (
        <>
          <h3>High Scores:</h3>
          <strong>Easy</strong>
          <p>{`Ascending: ${highScore.easy.ascending}`}</p>
          <p>{`Descending: ${highScore.easy.descending}`}</p>
          <p>{`Ascending & Descending: ${highScore.easy['ascending & descending']}`}</p>
          <strong>Hard</strong>
          <p>{`Ascending: ${highScore.hard.ascending}`}</p>
          <p>{`Descending: ${highScore.hard.descending}`}</p>
          <p>{`Ascending & Descending: ${highScore.hard['ascending & descending']}`}</p>
        </>
      )}
    </div>
  )
}

export default Score
