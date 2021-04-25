import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerCharacteristicController from '../store/controllers/PlayerCharacteristicController'

const BlockCharacteristic = () => {
  const store = useStore()
  const controller: PlayerCharacteristicController = store.getController(PlayerCharacteristicController)

  const allCharacteristicPoints = controller.getAllPoints()
  const availableCharacteristicPoints = controller.getAvailablePoints()

  const addCharacteristicPoint = (name: any) => {
    controller.setPoint(name)
  }

  const unsetAllPoints = () => {
    controller.unsetPoints()
  }

  const disabledCharacteristicButton = (name: any) => {
    return (
      controller.checkLimit(name) ||
      availableCharacteristicPoints === 0
    )
  }

  const strength = controller.getPoints('strength')
  const endurance = controller.getPoints('endurance')
  const intelligence = controller.getPoints('intelligence')

  return (
    <div>
      <div>Your characteristic: </div>
      <div>All: {allCharacteristicPoints}</div>
      <div>Available: {availableCharacteristicPoints}</div>

      <button onClick={unsetAllPoints}>Rest</button>

      <ul>
        <li>
          Strength: {strength}/10 |
          <button
            onClick={() => addCharacteristicPoint('strength')}
            disabled={disabledCharacteristicButton('strength')}
          >
            +1
          </button>
        </li>
        <li>
          Endurance: {endurance}/10 |
          <button
            onClick={() => addCharacteristicPoint('endurance')}
            disabled={disabledCharacteristicButton('endurance')}
          >
            +1
          </button>
        </li>
        <li>
          Intelligence: {intelligence}/10 |
          <button
            onClick={() => addCharacteristicPoint('intelligence')}
            disabled={disabledCharacteristicButton('intelligence')}
          >
            +1
          </button>
        </li>
      </ul>
    </div>
  )
}

export default observer(BlockCharacteristic)
