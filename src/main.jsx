import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './components/store'
import App from './App'
import Game from './components/Game'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Game />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
