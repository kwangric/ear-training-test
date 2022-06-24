import { createStore, combineReducers } from 'redux'
import state from './state'

// const reducer = combineReducers({
//   status
// })

const store = createStore(state)

export default store
