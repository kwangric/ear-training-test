import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeMode } from './store/state'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

const Modes = () => {
  const difficulty = useSelector((state) => state.difficulty)
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch()

  // Select Mode

  const selectMode = (event) => {
    dispatch(changeMode(event.target.value))
  }

  return (
    <>
      {difficulty ? (
        <></>
      ) : (
        <div>
          <TextField
            label="Mode"
            select
            id="mode"
            value={mode}
            onChange={selectMode}
          >
            <MenuItem value="ascending">Ascending</MenuItem>
            <MenuItem value="descending">Descending</MenuItem>
            <MenuItem value="ascendingDescending">
              Ascending & Descending
            </MenuItem>
            {/* <option value="harmonic">Harmonic</option> */}
          </TextField>
        </div>
      )}
    </>
  )
}

export default Modes
