// Action Type
const START_GAME = 'START_GAME'
const END_GAME = 'END_GAME'
const CHANGE_MODE = 'CHANGE_MODE'
const INCREASE_SCORE = 'INCREASE_SCORE'
const RESET_SCORE = 'RESET_SCORE'

// Action Creator
export const startGame = (difficulty) => {
  return {
    type: START_GAME,
    difficulty
  }
}

export const endGame = () => {
  return {
    type: END_GAME
  }
}

export const changeMode = (mode) => {
  return {
    type: CHANGE_MODE,
    mode
  }
}

export const increaseScore = () => {
  return {
    type: INCREASE_SCORE
  }
}

export const resetScore = () => {
  return {
    type: RESET_SCORE
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
const initialState = {
  difficulty: false,
  mode: 'ascending',
  score: 0,
  highScore: 0,
  notes
}

export default function statusReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return { ...state, difficulty: action.difficulty }
    case END_GAME:
      return { ...state, difficulty: false }
    case CHANGE_MODE:
      return { ...state, mode: action.mode }
    case INCREASE_SCORE:
      return { ...state, score: state.score + 1 }
    case RESET_SCORE:
      if (state.score > state.highScore) {
        return { ...state, score: 0, highScore: state.score }
      }
      return { ...state, score: 0 }
    default:
      return state
  }
}
