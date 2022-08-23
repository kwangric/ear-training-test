import React, { useState } from 'react'
import './App.css'
import Game from './components/Game'
import * as Tone from 'tone'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

function App() {
  const [status, setStatus] = useState(false)

  const startGame = async () => {
    await Tone.start()
    setStatus(true)
  }

  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(',')
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
              <Typography variant="h2" sx={{ margin: '1rem' }}>
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
          <HelpOutlineIcon className="about" />
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
