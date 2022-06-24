// Action Type
const START_GAME = 'START_GAME'
const END_GAME = 'END_GAME'

// Action Creator
export const startGame = (mode) => {
  return {
    type: START_GAME,
    mode
  }
}

export const endGame = () => {
  return {
    type: END_GAME
  }
}

// Initial State
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
const initialState = { mode: false, notes }

export default function statusReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return { ...state, mode: action.mode }
    case END_GAME:
      return { ...state, mode: false }
    default:
      return state
  }
}
