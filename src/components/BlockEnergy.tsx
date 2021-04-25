import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerEnergyController from '../store/controllers/PlayerEnergyController'

const BlockEnergy = () => {
  const store = useStore()
  const controller: PlayerEnergyController = store.getController(PlayerEnergyController)

  const energy = controller.getEnergy()
  const maxEnergy = controller.getEnergyMax()

  const incrementEnergy = () => {
    controller.increment(100)
  }

  const decrementEnergy = () => {
    controller.decrement(100)
  }

  return (
    <div>
      <div>
        Your energy: {energy}/{maxEnergy}
      </div>
      <button onClick={incrementEnergy}>Add 100</button>
      <button onClick={decrementEnergy}>Remove 100</button>
    </div>
  )
}

export default observer(BlockEnergy)
