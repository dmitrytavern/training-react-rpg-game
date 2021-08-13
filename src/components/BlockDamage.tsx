import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerDamageController from '../store/controllers/PlayerDamageController'

const BlockDamage = () => {
  const store = useStore()
  const controller: PlayerDamageController = store.getController(PlayerDamageController)

  const minDamage = controller.getDamageMin()
  const maxDamage = controller.getDamageMax()

  return (
    <div>
      <div>
        Your damage: {minDamage} - {maxDamage}
      </div>
    </div>
  )
}

export default observer(BlockDamage)
