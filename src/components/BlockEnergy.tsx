import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

const BlockEnergy = () => {
  const store = useStore()

  const energy = store.execute('player_energy:get_energy')
  const maxEnergy = store.execute('player_energy:get_max_energy')

  const incrementEnergy = () => {
    store.execute('player_energy:increment', 100)
  }

  const decrementEnergy = () => {
    store.execute('player_energy:decrement', 100)
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
