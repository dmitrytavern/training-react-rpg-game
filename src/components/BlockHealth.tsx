import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerHealthController from '../store/controllers/PlayerHealthController'

const BlockHealth = () => {
  const store = useStore()
  const controller: PlayerHealthController = store.getController(PlayerHealthController)

  const alive = controller.isAlive()
  const health = controller.getHealth()
  const maxHealth = controller.getHealthMax()

  const addHealth = () => {
    controller.increment(500)
  }

  const getHit = () => {
    controller.decrement(500)
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
