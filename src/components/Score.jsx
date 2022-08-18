import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HighScores from './HighScores'
import { Button, Fade, Modal, Typography } from '@mui/material'

const Score = () => {
  const [open, setOpen] = React.useState(false)
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
              sx={{ margin: '1rem' }}
              onClick={handleOpen}
            >
              High Scores
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Fade in={open}>
                <div className="modal">
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
