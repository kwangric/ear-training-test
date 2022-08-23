/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { endGame, increaseScore, resetScore } from '../store/state'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import * as Tone from 'tone'

const Game = () => {
  const notes = useSelector((state) => state.notes)
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const [status, setStatus] = useState('active')
  const [initialNote, setInitialNote] = useState(null)
  const [endNote, setEndNote] = useState(null)
  const [interval, setInterval] = useState(null)
  const [answer, setAnswer] = useState(false)

  // Intervals
  const hardIntervals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const hardIntervalNames = [
    'unison',
    'minor second',
    'major second',
    'minor third',
    'major third',
    'perfect fourth',
    'tritone',
    'perfect fifth',
    'minor sixth',
    'major sixth',
    'minor seventh',
    'major seventh',
    'octave'
  ]

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
    setGame()
  }, [])

  const setGame = () => {
    setAnswer(false)
    let first
    let newInterval
    if (mode === 'ascending') {
      newInterval = hardIntervals[Math.floor(Math.random() * 13)]
      first = Math.floor(Math.random() * (24 - newInterval))
    }
    if (mode === 'descending') {
      newInterval = hardIntervals[Math.floor(Math.random() * 13)] * -1
      first = Math.abs(Math.ceil(Math.random() * (24 + newInterval)) - 24)
    }
    if (mode === 'ascendingDescending') {
      if (Math.floor(Math.random() * 2) === 1) {
        newInterval = hardIntervals[Math.floor(Math.random() * 13)]
        first = Math.floor(Math.random() * (24 - newInterval))
      } else {
        newInterval = hardIntervals[Math.floor(Math.random() * 13)] * -1
        first = Math.abs(Math.ceil(Math.random() * (24 + newInterval)) - 24)
      }
    }
    const second = first + newInterval
    const firstNote = notes[first]
    const secondNote = notes[second]
    setInitialNote(firstNote)
    setEndNote(secondNote)
    setInterval(Math.abs(newInterval))
    setStatus('active')
    sequence(firstNote, secondNote)
  }

  const repeatSequence = () => {
    sequence(initialNote, endNote)
  }

  const selectInterval = (event) => {
    if (event.target.value == interval) {
      dispatch(increaseScore())
      setAnswer('Great job!')
      setInitialNote(null)
      setEndNote(null)
      setInterval(null)
      setStatus('correct')
    } else {
      dispatch(resetScore('hard', mode))
      setAnswer('Try again!')
    }
  }

  const abandonGame = () => {
    dispatch(resetScore('hard', mode))
    setAnswer(false)
    setInitialNote(null)
    setEndNote(null)
    setInterval(null)
    setStatus('abandon')
  }

  const changeMode = () => {
    dispatch(resetScore('hard', mode))
    dispatch(endGame())
  }

  let modeDisplay
  switch (mode) {
    case 'ascending':
      modeDisplay = 'Ascending'
      break
    case 'descending':
      modeDisplay = 'Descending'
      break
    case 'ascendingDescending':
      modeDisplay = 'Ascending & Descending'
      break
    default:
      break
  }

  return (
    <div>
      <Typography variant="h4" sx={{ margin: '1rem' }}>
        {`Hard (${modeDisplay})`}
      </Typography>

      <Typography
        variant="body2"
        sx={{ marginBottom: '1rem', display: 'block' }}
      >
        {answer ? answer : '\u00A0'}
      </Typography>

      {status === 'active' ? (
        <>
          {hardIntervals.map((interval, index) => (
            <Button
              variant="outlined"
              size="small"
              sx={{ margin: '0.25rem' }}
              onClick={selectInterval}
              value={interval}
              key={index}
              name={hardIntervalNames[index]}
            >
              {hardIntervalNames[index]
                .split(' ')
                .map(
                  (word) => word[0].toUpperCase() + word.slice(1, word.length)
                )
                .join(' ')}
            </Button>
          ))}
          <br />
          <br />
          <Button
            variant="outlined"
            size="large"
            sx={{ margin: '0.25rem' }}
            onClick={repeatSequence}
          >
            Repeat
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ margin: '0.25rem' }}
            onClick={abandonGame}
          >
            Give Up
          </Button>
        </>
      ) : status === 'correct' ? (
        <>
          <Button
            variant="outlined"
            size="large"
            sx={{ margin: '0.25rem' }}
            onClick={setGame}
          >
            Continue?
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ margin: '0.25rem' }}
            onClick={changeMode}
          >
            End Game
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            size="large"
            sx={{ margin: '0.25rem' }}
            onClick={setGame}
          >
            Try Again?
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ margin: '0.25rem' }}
            onClick={changeMode}
          >
            Back
          </Button>
        </>
      )}
    </div>
  )
}

export default Game
