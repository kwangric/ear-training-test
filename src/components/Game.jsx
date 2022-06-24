import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EasyMode from './modes/EasyMode'
import HardMode from './modes/HardMode'
import { startGame } from './store/state'

const Game = () => {
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch()

  // Select Mode
  const selectMode = (event) => {
    dispatch(startGame(event.target.value))
  }

  const toggleMode = () => {
    switch (mode) {
      case 'easy':
        return <EasyMode />
      case 'hard':
        return <HardMode />
      case false:
        return (
          <>
            <button onClick={selectMode} value="easy">
              Start (Easy)
            </button>
            <button onClick={selectMode} value="hard">
              Start (Hard)
            </button>
          </>
        )
    }
  }

  return <div>{toggleMode()}</div>
}

export default Game
