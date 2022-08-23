import React, { useState } from 'react'
import './App.css'
import Game from './components/Game'
import * as Tone from 'tone'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import GitHubIcon from '@mui/icons-material/GitHub'

function App() {
  const [status, setStatus] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
          <HelpOutlineIcon
            className="about"
            onClick={handleOpen}
            sx={{ cursor: 'pointer' }}
          />
          <Modal open={open} onClose={handleClose}>
            <Fade in={open}>
              <div className="about-modal">
                <div className="about-text">
                  <Typography variant="h5">About</Typography>
                  <br />
                  <Typography variant="body1">
                    Given two notes in sequence, your goal is to correctly
                    identify the interval between the two notes.
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    Easy difficulty only includes diatonic intervals.
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    Hard difficulty includes all intervals.
                  </Typography>
                </div>
                <div className="github-icon">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/kwangric/ear-training"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </Fade>
          </Modal>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
