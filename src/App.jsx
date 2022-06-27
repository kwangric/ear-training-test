import React, { useState } from 'react'
import './App.css'
import Game from './components/Game'
import * as Tone from 'tone'
import { Button, Typography } from '@mui/material'

function App() {
  const [status, setStatus] = useState(false)

  const startGame = async () => {
    await Tone.start()
    setStatus(true)
  }

  return (
    <>
      {status ? (
        <Game />
      ) : (
        <div>
          <Typography variant="h1">Tone Expert</Typography>
          <Typography variant="body1">(Best played on desktop)</Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ margin: '1rem' }}
            onClick={startGame}
          >
            Start Game
          </Button>
        </div>
      )}
    </>
  )
}

export default App
