import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

const BlockCharacteristic = () => {
  const store = useStore()

  const allCharacteristicPoints = store.execute('player_characteristic:get_all_points')
  const availableCharacteristicPoints = store.execute('player_characteristic:get_available_points')

  const addCharacteristicPoint = (name: any) => {
    store.execute('player_characteristic:set_point', name)
  }

  const unsetAllPoints = () => {
    store.execute('player_characteristic:unset_points')
  }

  const disabledCharacteristicButton = (name: any) => {
    return (
      store.execute('player_characteristic:check_point_limit', name) ||
      availableCharacteristicPoints === 0
    )
  }

  const strength = store.execute('player_characteristic:get_point', 'strength')
  const endurance = store.execute('player_characteristic:get_point', 'endurance')
  const intelligence = store.execute('player_characteristic:get_point', 'intelligence')

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
