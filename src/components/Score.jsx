import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HighScores from './HighScores'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

const Score = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const score = useSelector((state) => state.score)
  const highScore = useSelector((state) => state.highScore)
  const difficulty = useSelector((state) => state.difficulty)
  const mode = useSelector((state) => state.mode)

  return (
    <div>
      {difficulty ? (
        <Typography
          variant="h5"
          sx={{ margin: '1rem' }}
        >{`Score: ${score}`}</Typography>
      ) : (
        <>
          <>
            <Button
              variant="text"
              size="large"
              sx={{ marginTop: '1rem' }}
              onClick={handleOpen}
            >
              High Scores
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Fade in={open}>
                <div className="high-score-modal">
                  <HighScores />
                </div>
              </Fade>
            </Modal>
          </>
        </>
      )}
      {highScore[difficulty] && highScore[difficulty][mode] > 0 ? (
        <Typography variant="h5">{`High Score: ${highScore[difficulty][mode]}`}</Typography>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Score
