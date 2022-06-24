import React, { useState, useEffect } from 'react'
import * as Tone from 'tone'

const Game = () => {
  const [status, setStatus] = useState(false)
  const [initialNote, setInitialNote] = useState(null)
  const [endNote, setEndNote] = useState(null)
  const [interval, setInterval] = useState(null)

  // Notes & Intervals
  const notes = [
    'C3',
    'Db3',
    'D3',
    'Eb3',
    'E3',
    'F3',
    'Gb3',
    'G3',
    'Ab3',
    'A3',
    'Bb3',
    'B3',
    'C4',
    'Db4',
    'D4',
    'Eb4',
    'E4',
    'F4',
    'Gb4',
    'G4',
    'Ab4',
    'A4',
    'Bb4',
    'B4'
  ]
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

  const setGame = () => {
    const first = Math.floor(Math.random() * 12)
    const newInterval = easyIntervals[Math.floor(Math.random() * 7)]
    const second = first + newInterval
    const firstNote = notes[first]
    const secondNote = notes[second]
    setStatus(true)
    setInitialNote(firstNote)
    setEndNote(secondNote)
    setInterval(newInterval)
    sequence(firstNote, secondNote)
  }

  const repeatSequence = () => {
    sequence(initialNote, endNote)
  }

  const selectInterval = (event) => {
    if (event.target.value == interval) {
      alert('Great job!')
      setStatus(false)
      setInitialNote(null)
      setEndNote(null)
      setInterval(null)
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
          <button onClick={selectInterval} value="0">
            Unison
          </button>
          <button onClick={selectInterval} value="2">
            Major Second
          </button>
          <button onClick={selectInterval} value="4">
            Major Third
          </button>
          <button onClick={selectInterval} value="5">
            Perfect Fourth
          </button>
          <button onClick={selectInterval} value="7">
            Perfect Fifth
          </button>
          <button onClick={selectInterval} value="9">
            Major Sixth
          </button>
          <button onClick={selectInterval} value="11">
            Major Seventh
          </button>
          <button onClick={selectInterval} value="12">
            Octave
          </button>
        </>
      ) : (
        <button onClick={setGame}>Start</button>
      )}
    </div>
  )
}

export default Game
