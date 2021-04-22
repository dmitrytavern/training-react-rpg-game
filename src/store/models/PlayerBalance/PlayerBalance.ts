import PlayerBalanceMoney from '../PlayerBalanceMoney'
import { PlayerBalanceProps } from './types'

class PlayerBalance {
  public money: PlayerBalanceMoney

  constructor(props: PlayerBalanceProps) {
    this.money = new PlayerBalanceMoney(props.money)
  }
}

export default PlayerBalance
