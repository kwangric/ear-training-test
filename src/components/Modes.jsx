import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeMode } from './store/state'

const Modes = () => {
  const difficulty = useSelector((state) => state.difficulty)
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch()

  // Select Mode
  const selectDifficulty = (event) => {
    dispatch(changeMode(event.target.value))
  }

  return (
    <>
      {difficulty ? (
        <></>
      ) : (
        <div>
          <label htmlFor="mode">Choose mode:</label>
          <select
            id="mode"
            name="mode"
            value={mode}
            onChange={selectDifficulty}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="ascending & descending">
              Ascending & Descending
            </option>
            {/* <option value="harmonic">Harmonic</option> */}
          </select>
        </div>
      )}
    </>
  )
}

export default Modes
