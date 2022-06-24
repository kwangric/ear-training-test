/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { endGame } from '../store/state'
import * as Tone from 'tone'

const Game = () => {
  const notes = useSelector((state) => state.notes)
  const dispatch = useDispatch()
  const [status, setStatus] = useState(true)
  const [initialNote, setInitialNote] = useState(null)
  const [endNote, setEndNote] = useState(null)
  const [interval, setInterval] = useState(null)

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
    const first = Math.floor(Math.random() * 12)
    const newInterval = hardIntervals[Math.floor(Math.random() * 13)]
    const second = first + newInterval
    const firstNote = notes[first]
    const secondNote = notes[second]
    setInitialNote(firstNote)
    setEndNote(secondNote)
    setInterval(newInterval)
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
          {hardIntervals.map((interval, index) => (
            <button
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
