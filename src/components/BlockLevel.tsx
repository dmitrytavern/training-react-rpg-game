import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

const BlockLevel = () => {
  const store = useStore()

  const level = store.execute('player_level:get_level')
  const xp = store.execute('player_level:get_experience')
  const maxEp = store.execute('player_level:get_experience_max')

  const addExp = () => {
    store.execute('player_level:add_experience', 50)
  }

  const addExpWithCalc = () => {
    const exp = store.execute('player_level:calculate_experience', 50)
    store.execute('player_level:add_experience', exp)
  }

  return (
    <div>
      <div>Your level: {level}</div>
      <div>
        Your xp: {xp}/{maxEp}
      </div>
      <button onClick={addExp}>Add 50 xp</button>
      <button onClick={addExpWithCalc}>Add 50 xp with calc</button>
    </div>
  )
}

export default observer(BlockLevel)
