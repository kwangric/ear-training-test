import React from 'react'
import { useSelector } from 'react-redux'

const Score = () => {
  const score = useSelector((state) => state.score)
  const highScore = useSelector((state) => state.highScore)
  const difficulty = useSelector((state) => state.difficulty)
  const mode = useSelector((state) => state.mode)

  return (
    <div>
      {difficulty ? <p>{`Score: ${score}`}</p> : <></>}
      {highScore[difficulty] && highScore[difficulty][mode] > 0 ? (
        <p>{`High Score: ${highScore[difficulty][mode]}`}</p>
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
            <h3>High Scores</h3>
          ) : (
            <></>
          )}
          {highScore.easy.ascending > 0 ||
          highScore.easy.descending > 0 ||
          highScore.easy['ascending & descending'] > 0 ? (
            <strong>Easy</strong>
          ) : (
            <></>
          )}
          {highScore.easy.ascending > 0 ? (
            <p>{`Ascending: ${highScore.easy.ascending}`}</p>
          ) : (
            <></>
          )}
          {highScore.easy.descending > 0 ? (
            <p>{`Descending: ${highScore.easy.descending}`}</p>
          ) : (
            <></>
          )}
          {highScore.easy['ascending & descending'] > 0 ? (
            <p>{`Ascending & Descending: ${highScore.easy['ascending & descending']}`}</p>
          ) : (
            <></>
          )}
          {highScore.hard.ascending > 0 ||
          highScore.hard.descending > 0 ||
          highScore.hard['ascending & descending'] > 0 ? (
            <strong>Hard</strong>
          ) : (
            <></>
          )}
          {highScore.hard.ascending > 0 ? (
            <p>{`Ascending: ${highScore.hard.ascending}`}</p>
          ) : (
            <></>
          )}
          {highScore.hard.descending > 0 ? (
            <p>{`Descending: ${highScore.hard.descending}`}</p>
          ) : (
            <></>
          )}
          {highScore.hard['ascending & descending'] > 0 ? (
            <p>{`Ascending & Descending: ${highScore.hard['ascending & descending']}`}</p>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  )
}

export default Score
