import styles from './App.module.css'
import { observer } from 'mobx-react-lite'
import { useStore } from './contexts/storeContext'

import BlockLevel from './components/BlockLevel'
import BlockHealth from './components/BlockHealth'
import BlockEnergy from './components/BlockEnergy'
import BlockDamage from './components/BlockDamage'
import BlockDefence from './components/BlockDefence'
import BlockBalance from './components/BlockBalance'
import BlockCharacteristic from './components/BlockCharacteristic'
import BlockInventory from './components/BlockInventory'
import BlockFavorites from './components/BlockFavorites'
import BlockEquipment from './components/BlockEquipment'
import BlockCraft from './components/BlockCraft'
// import BlockQuests from './components/BlockQuests'

const App = () => {
  return (
    <div>
      <h1>Player Parameters: </h1>
      <div className={styles.Container}>
        <div>
          <h2>Level</h2>
          <BlockLevel />
        </div>

        <div>
          <h2>Health</h2>
          <BlockHealth />
        </div>

        <div>
          <h2>Energy</h2>
          <BlockEnergy />
        </div>

        <div>
          <h2>Damage</h2>
          <BlockDamage />
        </div>

        <div>
          <h2>Defense</h2>
          <BlockDefence />
        </div>

        <div>
          <h2>Balance</h2>
          <BlockBalance />
        </div>
      </div>

      <h1>Player Mechanics: </h1>
      <div className={styles.Container}>
        <div>
          <h2>Characteristics</h2>
          <BlockCharacteristic />
        </div>

        <div>
          <h2>Inventory</h2>
          <BlockInventory />
        </div>

        <div>
          <h2>Favorites</h2>
          <BlockFavorites />
        </div>

        <div>
          <h2>Equipment</h2>
          <BlockEquipment />
        </div>
      </div>

      <h1>Craft Mechanics: </h1>
      <div className={styles.Container}>
        <div>
          <h2>Craft</h2>
          <BlockCraft />
        </div>
      </div>

      <h1>Quests Mechanics: </h1>
      <div className={styles.Container}>
        {/*  <div>*/}
        {/*    <h2>Quests</h2>*/}
        {/*    <BlockQuests />*/}
        {/*  </div>*/}
      </div>
    </div>
  )
}

export default observer(App)
