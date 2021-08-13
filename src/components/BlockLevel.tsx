import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerLevelController from '../store/controllers/PlayerLevelController'

const BlockLevel = () => {
  const store = useStore()
  const controller: PlayerLevelController = store.getController(PlayerLevelController)

  const level = controller.getLevel()
  const xp = controller.getExperience()
  const maxEp = controller.getExperienceMax()

  const addExp = () => {
    controller.addExperience(50)
  }

  return (
    <div>
      <div>Your level: {level}</div>
      <div>
        Your xp: {xp}/{maxEp}
      </div>
      <button onClick={addExp}>Add 50 xp (with calc in controller)</button>
    </div>
  )
}

export default observer(BlockLevel)
