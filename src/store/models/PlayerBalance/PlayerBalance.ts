import PlayerBalanceMoney from '../PlayerBalanceMoney'

class PlayerBalance {
  public money: PlayerBalanceMoney

  constructor() {
    this.money = new PlayerBalanceMoney(0)
  }
}

export default PlayerBalance
