import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import Player from './store/models/Player'
import Craft from './store/models/Craft'
import Quests from './store/models/Quests'
import ItemsFactory from './store/models/ItemsFactory'
import Store from './store/Store'

import { StoreContext } from './contexts/storeContext'
import { PlayerContext } from './contexts/playerStoreContext'

const itemsFactory = ItemsFactory.newInstance()

const player = new Player()
const craft = new Craft(player.inventory)
const quests = new Quests()

const store = new Store({
  craft,
  quests,
  itemsFactory,
  playerLevel: player.level,
  playerHealth: player.health,
  playerDamage: player.damage,
  playerDefense: player.defense,
  playerEnergy: player.energy,
  playerInventory: player.inventory,
  playerBalance: player.balance,
  playerCharacteristic: player.characteristic,
  playerFavorites: player.favorites,
})

quests.init(store)

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <PlayerContext.Provider value={player}>
        <App />
      </PlayerContext.Provider>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
