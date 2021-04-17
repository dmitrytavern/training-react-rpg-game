import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppCraft from './AppCraft'
import AppQuests from './AppQuests'
import reportWebVitals from './reportWebVitals'

import Player from './store/Player'
import Craft from './store/Craft'
import Quests from './store/Quests'
import ItemsFactory from './store/ItemsFactory'

import { PlayerContext } from './contexts/playerStoreContext'
import { CraftContext } from './contexts/craftStoreContext'
import { ItemsFactoryContext } from './contexts/itemsFactoryStoreContext'
import { QuestsContext } from './contexts/questsStoreContext'

const itemsFactory = ItemsFactory.newInstance()

const player = new Player()
const craft = new Craft(player.inventory)
const quests = new Quests({
  playerLevel: player.level,
  playerInventory: player.inventory,
  playerBalance: player.balance,
})

ReactDOM.render(
  <React.StrictMode>
    <PlayerContext.Provider value={player}>
      <CraftContext.Provider value={craft}>
        <QuestsContext.Provider value={quests}>
          <ItemsFactoryContext.Provider value={itemsFactory}>
            <App />
            <AppCraft />
            <AppQuests />
          </ItemsFactoryContext.Provider>
        </QuestsContext.Provider>
      </CraftContext.Provider>
    </PlayerContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
