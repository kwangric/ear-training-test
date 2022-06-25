/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { endGame } from '../store/state'
import * as Tone from 'tone'

const Game = () => {
  const notes = useSelector((state) => state.notes)
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const [status, setStatus] = useState(true)
  const [initialNote, setInitialNote] = useState(null)
  const [endNote, setEndNote] = useState(null)
  const [interval, setInterval] = useState(null)

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
          <button onClick={repeatSequence}>Repeat</button>
          {easyIntervals.map((interval, index) => (
            <button
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
            </button>
          ))}
        </>
      ) : (
        <>
          <button onClick={setGame}>Try Again?</button>
          <button onClick={() => dispatch(endGame())}>Change Mode</button>
        </>
      )}
    </div>
  )
}

export default Game
