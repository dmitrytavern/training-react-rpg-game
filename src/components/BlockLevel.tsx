import { observer } from 'mobx-react-lite'
import { useCommander } from '../contexts/commanderStoreContext'

const BlockLevel = () => {
  const app = useCommander()

  const level = app.execute('player_level:get_level')
  const xp = app.execute('player_level:get_experience')
  const maxEp = app.execute('player_level:get_experience_max')

  const addExp = () => {
    app.execute('player_level:add_experience', 50)
  }

  const addExpWithCalc = () => {
    const exp = app.execute('player_level:calculate_experience', 50)
    app.execute('player_level:add_experience', exp)
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
