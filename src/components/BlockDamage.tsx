import { observer } from 'mobx-react-lite'
import { useCommander } from '../contexts/commanderStoreContext'

const BlockDamage = () => {
  const app = useCommander()

  const minDamage = app.execute('player_damage:get_min_damage')
  const maxDamage = app.execute('player_damage:get_max_damage')

  return (
    <div>
      <div>
        Your damage: {minDamage} - {maxDamage}
      </div>
    </div>
  )
}

export default observer(BlockDamage)
