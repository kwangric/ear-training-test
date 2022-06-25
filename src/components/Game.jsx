import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Easy from './difficulties/Easy'
import Hard from './difficulties/Hard'
import Modes from './Modes'
import { startGame } from './store/state'

const Game = () => {
  const difficulty = useSelector((state) => state.difficulty)
  const dispatch = useDispatch()

  // Select Difficulty
  const selectDifficulty = (event) => {
    dispatch(startGame(event.target.value))
  }

  const toggleDifficulty = () => {
    switch (difficulty) {
      case 'easy':
        return <Easy />
      case 'hard':
        return <Hard />
      case false:
        return (
          <>
            <button onClick={selectDifficulty} value="easy">
              Start (Easy)
            </button>
            <button onClick={selectDifficulty} value="hard">
              Start (Hard)
            </button>
          </>
        )
    }
  }

  return (
    <div>
      {toggleDifficulty()}
      <Modes />
    </div>
  )
}

export default Game
