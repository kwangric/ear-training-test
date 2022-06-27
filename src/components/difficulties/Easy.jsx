/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { endGame, increaseScore, resetScore } from '../store/state'
import { Button, Typography } from '@mui/material'
import * as Tone from 'tone'

const Game = () => {
  const notes = useSelector((state) => state.notes)
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const [status, setStatus] = useState(true)
  const [initialNote, setInitialNote] = useState(null)
  const [endNote, setEndNote] = useState(null)
  const [interval, setInterval] = useState(null)
  const [answer, setAnswer] = useState(false)

  // Intervals
  const easyIntervals = [0, 2, 4, 5, 7, 9, 11, 12]
  const easyIntervalNames = [
    'unison',
    'major second',
    'major third',
    'perfect fourth',
    'perfect fifth',
    'major sixth',
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
      newInterval = easyIntervals[Math.floor(Math.random() * 8)]
      first = Math.floor(Math.random() * (24 - newInterval))
    }
    if (mode === 'descending') {
      newInterval = easyIntervals[Math.floor(Math.random() * 8)] * -1
      first = Math.abs(Math.ceil(Math.random() * (24 + newInterval)) - 24)
    }
    if (mode === 'ascending & descending') {
      if (Math.floor(Math.random() * 2) === 1) {
        newInterval = easyIntervals[Math.floor(Math.random() * 8)]
        first = Math.floor(Math.random() * (24 - newInterval))
      } else {
        newInterval = easyIntervals[Math.floor(Math.random() * 8)] * -1
        first = Math.abs(Math.ceil(Math.random() * (24 + newInterval)) - 24)
      }
    }
    const second = first + newInterval
    const firstNote = notes[first]
    const secondNote = notes[second]
    setInitialNote(firstNote)
    setEndNote(secondNote)
    setInterval(Math.abs(newInterval))
    setStatus(true)
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
      setStatus(false)
    } else {
      dispatch(resetScore('easy', mode))
      setAnswer('Try again!')
    }
  }

  const abandonGame = () => {
    dispatch(resetScore('easy', mode))
    setAnswer(false)
    setInitialNote(null)
    setEndNote(null)
    setInterval(null)
    setStatus(false)
  }

  const changeMode = () => {
    dispatch(resetScore('easy', mode))
    dispatch(endGame())
  }

  return (
    <div>
      <Typography variant="h4" sx={{ margin: '1rem' }}>
        {`Easy (${mode
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1, word.length))
          .join(' ')})`}
      </Typography>

      <Typography
        variant="body2"
        sx={{ marginBottom: '1rem', display: 'block' }}
      >
        {answer ? answer : '\u00A0'}
      </Typography>

      {status ? (
        <>
          {easyIntervals.map((interval, index) => (
            <Button
              variant="outlined"
              size="small"
              sx={{ margin: '0.25rem' }}
              onClick={selectInterval}
              value={interval}
              key={index}
              name={easyIntervalNames[index]}
            >
              {easyIntervalNames[index]
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
          <br />
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
