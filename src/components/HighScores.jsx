import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetHighScore } from '../store/state'
import {
  Button,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'

const HighScores = () => {
  const highScore = useSelector((state) => state.highScore)
  const dispatch = useDispatch()

  return (
    <>
      <TableContainer sx={{ maxWidth: '250px', margin: 'auto' }}>
        <Typography variant="h6">Easy</Typography>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Ascending</TableCell>
              <TableCell>{`${highScore.easy.ascending}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Descending</TableCell>
              <TableCell>{`${highScore.easy.descending}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ascending & Descending</TableCell>
              <TableCell>{`${highScore.easy.ascendingDescending}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <Typography variant="h6">Hard</Typography>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Ascending</TableCell>
              <TableCell>{`${highScore.hard.ascending}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Descending</TableCell>
              <TableCell>{`${highScore.hard.descending}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ascending & Descending</TableCell>
              <TableCell>{`${highScore.hard.ascendingDescending}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="text"
        size="large"
        sx={{ margin: '1rem' }}
        onClick={dispatch(resetHighScore())}
      >
        Reset
      </Button>
    </>
  )
}

export default HighScores
