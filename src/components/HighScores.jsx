import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetHighScore } from './store/state'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

const HighScores = () => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const highScore = useSelector((state) => state.highScore)
  const dispatch = useDispatch()

  const reset = () => {
    dispatch(resetHighScore())
    handleClose()
  }

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
        onClick={handleClickOpen}
      >
        Reset
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Are you sure?'}</DialogTitle>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={reset}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HighScores
