/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { endGame, increaseScore, resetScore } from '../store/state'
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
    if (mode === 'ascending & descending') {
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
    setStatus(true)
    sequence(firstNote, secondNote)
  }

  const repeatSequence = () => {
    sequence(initialNote, endNote)
  }

  const selectInterval = (event) => {
    if (event.target.value == interval) {
      dispatch(increaseScore())
      switch (event.target.name) {
        case 'unison':
          setAnswer(`Great job! It was unison.`)
          break
        case 'octave':
          setAnswer(`Great job! It was an octave.`)
          break
        default:
          setAnswer(`Great job! It was a ${event.target.name}.`)
          break
      }
      setInitialNote(null)
      setEndNote(null)
      setInterval(null)
      setStatus(false)
    } else {
      dispatch(resetScore())
      setAnswer('Try again :(')
    }
  }

  const abandonGame = () => {
    dispatch(resetScore())
    setAnswer(false)
    setInitialNote(null)
    setEndNote(null)
    setInterval(null)
    setStatus(false)
  }

  return (
    <div>
      <h3>
        {`Hard (${mode
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1, word.length))
          .join(' ')})`}
      </h3>
      {status ? (
        <>
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
          <button onClick={repeatSequence}>Repeat</button>
          <button onClick={abandonGame}>Give Up</button>
        </>
      ) : (
        <>
          <button onClick={setGame}>Try Again?</button>
          <button onClick={() => dispatch(endGame())}>Change Mode</button>
        </>
      )}
      {answer ? (
        <>
          <p>{`${answer}`}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Game
