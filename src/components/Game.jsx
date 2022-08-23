import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Easy from './difficulties/Easy'
import Hard from './difficulties/Hard'
import Modes from './Modes'
import Score from './Score'
import { startGame } from './store/state'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

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
            <Typography variant="h3" sx={{ margin: '1rem' }}>
              Choose Difficulty & Mode
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ margin: '1rem' }}
              onClick={selectDifficulty}
              value="easy"
            >
              Start (Easy)
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ margin: '1rem' }}
              onClick={selectDifficulty}
              value="hard"
            >
              Start (Hard)
            </Button>
            <br />
            <br />
          </>
        )
    }
  }

  return (
    <div>
      {toggleDifficulty()}
      <Modes />
      <Score />
    </div>
  )
}

export default Game
