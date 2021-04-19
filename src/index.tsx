import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import Player from './store/Player'
import Craft from './store/Craft'
import Quests from './store/Quests'
import ItemsFactory from './store/ItemsFactory'
import Commander from './store/Commander'

import { PlayerContext } from './contexts/playerStoreContext'
import { ItemsFactoryContext } from './contexts/itemsFactoryStoreContext'
import { CommanderContext } from './contexts/commanderStoreContext'

const itemsFactory = ItemsFactory.newInstance()

const player = new Player()
const craft = new Craft(player.inventory)
const quests = new Quests()

const commander = new Commander({
  craft,
  quests,
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

quests.init(commander)

ReactDOM.render(
  <React.StrictMode>
    <CommanderContext.Provider value={commander}>
      <PlayerContext.Provider value={player}>
        <ItemsFactoryContext.Provider value={itemsFactory}>
          <App />
        </ItemsFactoryContext.Provider>
      </PlayerContext.Provider>
    </CommanderContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
