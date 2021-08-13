import Controller from '../Controller'

import PlayerBalance from '../../models/PlayerBalance'

@Controller([PlayerBalance])
class PlayerBalanceController {
  constructor(private playerBalance: PlayerBalance) {}

  public getMoney() {
    return this.playerBalance.money.getMoney()
  }

  public getMoneyInCoppers() {
    return this.playerBalance.money.getMoneyInCoppers()
  }

  public incrementMoney(value: number) {
    return this.playerBalance.money.incrementMoney(value)
  }

  public decrementMoney(value: number) {
    return this.playerBalance.money.decrementMoney(value)
  }
}

export default PlayerBalanceController
