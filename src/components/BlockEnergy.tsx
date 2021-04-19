import { observer } from 'mobx-react-lite'
import { useCommander } from '../contexts/commanderStoreContext'

const BlockEnergy = () => {
  const app = useCommander()

  const energy = app.execute('player_energy:get_energy')
  const maxEnergy = app.execute('player_energy:get_max_energy')

  const incrementEnergy = () => {
    app.execute('player_energy:increment', 100)
  }

  const decrementEnergy = () => {
    app.execute('player_energy:decrement', 100)
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
