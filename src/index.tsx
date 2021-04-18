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
import Commander from './store/Commander'

import { PlayerContext } from './contexts/playerStoreContext'
import { CraftContext } from './contexts/craftStoreContext'
import { ItemsFactoryContext } from './contexts/itemsFactoryStoreContext'
import { QuestsContext } from './contexts/questsStoreContext'
import { observer } from 'mobx-react-lite'

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

const Hell = observer(() => {
  // console.log(commander.execute('player_health:increment_health', 10))
  return (
    <div>
      <button onClick={() => commander.execute('player_health:increment', 10)}>CLICK</button>
    </div>
  )
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
            <Hell />
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
