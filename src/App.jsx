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
        <div>
          <h1>Tone Expert</h1>
          <p>(Best played on desktop)</p>
          <button onClick={() => startGame(true)}>Start Game</button>
        </div>
      )}
    </>
  )
}

export default App
