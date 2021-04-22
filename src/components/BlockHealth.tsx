import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

const BlockHealth = () => {
  const store = useStore()

  const alive = store.execute('player_health:get_alive')
  const health = store.execute('player_health:get_health')
  const maxHealth = store.execute('player_health:get_max_health')

  const addHealth = () => {
    store.execute('player_health:increment', 500)
  }

  const getHit = () => {
    const damage = store.execute('player_defense:calculate_damaging', 500)
    store.execute('player_health:decrement', damage)
  }

  return (
    <div>
      <div>You are {alive ? 'alive' : 'death'}</div>

      <div>
        Your health: {health}/{maxHealth}
      </div>

      <button onClick={getHit}>Get 500 damage</button>
      <button onClick={addHealth}>Add 500 health</button>
    </div>
  )
}

export default observer(BlockHealth)
