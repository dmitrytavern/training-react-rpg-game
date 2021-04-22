import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

const BlockDefence = () => {
  const store = useStore()

  const defenceNumber = store.execute('player_defense:get_defense')
  const defencePercent = store.execute('player_defense:get_defense_percent')

  return (
    <div>
      <div>
        Your defense: {defenceNumber} or {defencePercent}%
      </div>
    </div>
  )
}

export default observer(BlockDefence)
