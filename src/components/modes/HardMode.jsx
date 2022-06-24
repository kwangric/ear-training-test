import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { endGame } from '../store/state'
import * as Tone from 'tone'

const Game = () => {
  const notes = useSelector((state) => state.notes)
  const dispatch = useDispatch()
  const [status, setStatus] = useState(false)
  const [initialNote, setInitialNote] = useState(null)
  const [endNote, setEndNote] = useState(null)
  const [interval, setInterval] = useState(null)

  // Intervals
  const easyIntervals = [0, 2, 4, 5, 7, 9, 11, 12]

  // Synth
  const synth = new Tone.Synth().toDestination()
  const play = (note) => synth.triggerAttackRelease(note, '3n')
  const sequence = (first, second) => {
    play(first)
    setTimeout(function () {
      play(second)
    }, 1250)
  }

  useEffect(() => {
    // setGame()
  }, [])

  const repeatSequence = () => {
    sequence(initialNote, endNote)
  }

  const setGame = () => {
    const first = Math.floor(Math.random() * 12)
    const newInterval = easyIntervals[Math.floor(Math.random() * 7)]
    const second = first + newInterval
    const firstNote = notes[first]
    const secondNote = notes[second]
    setInitialNote(firstNote)
    setEndNote(secondNote)
    setInterval(newInterval)
    setStatus(true)
    sequence(firstNote, secondNote)
  }

  const selectInterval = (event) => {
    if (event.target.value == interval) {
      switch (event.target.name) {
        case 'unison':
          alert(`Great job! It was unison.`)
          break
        case 'octave':
          alert(`Great job! It was an octave.`)
          break
        default:
          alert(`Great job! It was a ${event.target.name}.`)
          break
      }
      setInitialNote(null)
      setEndNote(null)
      setInterval(null)
      setStatus(false)
    } else {
      alert('Try again :(')
    }
  }

  return (
    <div>
      {status ? (
        <>
          <button onClick={repeatSequence} value="0">
            Repeat
          </button>
          <button onClick={selectInterval} value="0" name="unison">
            Unison
          </button>
          <button onClick={selectInterval} value="2" name="major second">
            Major Second
          </button>
          <button onClick={selectInterval} value="4" name="major third">
            Major Third
          </button>
          <button onClick={selectInterval} value="5" name="perfect fourth">
            Perfect Fourth
          </button>
          <button onClick={selectInterval} value="7" name="perfect fifth">
            Perfect Fifth
          </button>
          <button onClick={selectInterval} value="9" name="major sixth">
            Major Sixth
          </button>
          <button onClick={selectInterval} value="11" name="major seventh">
            Major Seventh
          </button>
          <button onClick={selectInterval} value="12" name="octave">
            Octave
          </button>
        </>
      ) : (
        <>
          <p>Coming Soon!</p>
          <button onClick={() => dispatch(endGame())}>Change Mode</button>
        </>
      )}
    </div>
  )
}

export default Game
