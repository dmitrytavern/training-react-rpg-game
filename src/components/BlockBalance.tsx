import { observer } from 'mobx-react-lite'
import { useStore } from '../contexts/storeContext'

import PlayerBalanceController from '../store/controllers/PlayerBalanceController'

const BlockBalance = () => {
  const store = useStore()
  const controller: PlayerBalanceController = store.getController(PlayerBalanceController)

  const balanceMoney = controller.getMoney()

  const addMoney = (count: number) => {
    controller.incrementMoney(count)
  }

  const removeMoney = (count: number) => {
    controller.decrementMoney(count)
  }

  return (
    <div>
      <div>Your balance:</div>
      <div>
        <div>
          Money:
          {balanceMoney.gold !== 0 && <span> {balanceMoney.gold} gold </span>}
          {balanceMoney.silver !== 0 && <span> {balanceMoney.silver} silvers </span>}
          <span> {balanceMoney.copper} coppers </span>
        </div>

        <button onClick={() => addMoney(1)}>Add 1 copper</button>
        <button onClick={() => addMoney(100)}>Add 1 silver</button>
        <button onClick={() => addMoney(10000)}>Add 1 gold</button>
        <button
          onClick={() => removeMoney(1)}
          disabled={
            balanceMoney.copper === 0 && balanceMoney.silver === 0 && balanceMoney.gold === 0
          }
        >
          Remove 1 copper
        </button>
        <button
          onClick={() => removeMoney(100)}
          disabled={balanceMoney.silver === 0 && balanceMoney.gold === 0}
        >
          Remove 1 silver
        </button>
        <button onClick={() => removeMoney(10000)} disabled={balanceMoney.gold === 0}>
          Remove 1 gold
        </button>
      </div>
    </div>
  )
}

export default observer(BlockBalance)
