import React from 'react'
import { useSelector } from 'react-redux'

const Score = () => {
  const score = useSelector((state) => state.score)
  const highScore = useSelector((state) => state.highScore)

  return (
    <div>
      <p>{`Score: ${score}`}</p>
      {highScore > 0 ? <p>{`High Score: ${highScore}`}</p> : <></>}
    </div>
  )
}

export default Score
