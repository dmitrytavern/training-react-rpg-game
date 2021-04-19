import { observer } from 'mobx-react-lite'
import { useCommander } from '../contexts/commanderStoreContext'

const BlockHealth = () => {
  const app = useCommander()

  const alive = app.execute('player_health:get_alive')
  const health = app.execute('player_health:get_health')
  const maxHealth = app.execute('player_health:get_max_health')

  const addHealth = () => {
    app.execute('player_health:increment', 500)
  }

  const getHit = () => {
    const damage = app.execute('player_defense:calculate_damaging', 500)
    app.execute('player_health:decrement', damage)
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
