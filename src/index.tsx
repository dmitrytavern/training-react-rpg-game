import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import Player from "./store/Player"

import { PlayerContext } from "./contexts/playerStoreContext"

const player = new Player()

ReactDOM.render(
  <React.StrictMode>
    <PlayerContext.Provider value={player}>
      <App />
    </PlayerContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
