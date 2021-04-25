import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerDefenseController from '../store/controllers/PlayerDefenseController'

const BlockDefence = () => {
  const store = useStore()
  const controller: PlayerDefenseController = store.getController(PlayerDefenseController)

  const defenceNumber = controller.getDefense()
  const defencePercent = controller.getDefensePercent()

  return (
    <div>
      <div>
        Your defense: {defenceNumber} or {defencePercent}%
      </div>
    </div>
  )
}

export default observer(BlockDefence)
