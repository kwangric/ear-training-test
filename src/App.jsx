import React, { useState } from 'react'
import './App.css'
import Game from './components/Game'
import * as Tone from 'tone'

function App() {
  const [status, setStatus] = useState(false)

  const startGame = async () => {
    await Tone.start()
    setStatus(true)
  }

  return (
    <>
      {status ? (
        <Game />
      ) : (
        <button onClick={() => startGame(true)}>Start Game</button>
      )}
    </>
  )
}

export default App
