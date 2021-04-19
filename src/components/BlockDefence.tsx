import { observer } from 'mobx-react-lite'
import { useCommander } from '../contexts/commanderStoreContext'

const BlockDefence = () => {
  const app = useCommander()

  const defenceNumber = app.execute('player_defense:get_defense')
  const defencePercent = app.execute('player_defense:get_defense_percent')

  return (
    <div>
      <div>
        Your defense: {defenceNumber} or {defencePercent}%
      </div>
    </div>
  )
}

export default observer(BlockDefence)
