import React, { useState } from 'react'
import './App.css'
import Game from './components/Game'
import * as Tone from 'tone'
import { Box, Button, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  const [status, setStatus] = useState(false)

  const startGame = async () => {
    await Tone.start()
    setStatus(true)
  }

  const theme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <Box>
          {status ? (
            <Game />
          ) : (
            <div>
              <Typography variant="h1" sx={{ margin: '1rem' }}>
                Tone Expert
              </Typography>
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
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
