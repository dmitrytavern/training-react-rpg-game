import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

const BlockDamage = () => {
  const store = useStore()

  const minDamage = store.execute('player_damage:get_min_damage')
  const maxDamage = store.execute('player_damage:get_max_damage')

  return (
    <div>
      <div>
        Your damage: {minDamage} - {maxDamage}
      </div>
    </div>
  )
}

export default observer(BlockDamage)
