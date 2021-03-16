import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppCraft from "./AppCraft"
import reportWebVitals from './reportWebVitals'

import Player from "./store/Player"
import Craft from "./store/Craft"

import { PlayerContext } from "./contexts/playerStoreContext"
import { CraftContext } from "./contexts/craftStoreContext"

const player = new Player()
const craft = new Craft(player.inventory)

ReactDOM.render(
  <React.StrictMode>
    <PlayerContext.Provider value={player}>
      <CraftContext.Provider value={craft}>
        <App />
        <AppCraft />
      </CraftContext.Provider>
    </PlayerContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
