import PlayerBalance from './PlayerBalance'
import { Money } from '../PlayerBalanceMoney/types'

interface Context {
  playerBalance?: PlayerBalance
}

class Api {
  public static getMoney(context: Context): Money {
    const balance = context.playerBalance

    if (!balance) {
      throw new Error('PlayerBalance is undefined')
    }

    return balance.money.getMoney()
  }

  public static getMoneyInCoppers(context: Context): number {
    const balance = context.playerBalance

    if (!balance) {
      throw new Error('PlayerBalance is undefined')
    }

    return balance.money.getMoneyInCoppers()
  }

  public static checkMoneyBalance(context: Context, payload: number): boolean {
    const balance = context.playerBalance

    if (!balance) {
      throw new Error('PlayerBalance is undefined')
    }

    return balance.money.getMoneyInCoppers() >= payload
  }

  public static incrementMoney(context: Context, payload: number) {
    const balance = context.playerBalance

    if (!balance) {
      throw new Error('PlayerBalance is undefined')
    }

    balance.money.incrementMoney(payload)
  }

  public static decrementMoney(context: Context, payload: number) {
    const balance = context.playerBalance

    if (!balance) {
      throw new Error('PlayerBalance is undefined')
    }

    balance.money.decrementMoney(payload)
  }
}

const PlayerBalanceApi = {
  'player_balance:get_money': Api.getMoney,
  'player_balance:get_money_by_coppers': Api.getMoneyInCoppers,
  'player_balance:check_money_balance': Api.checkMoneyBalance,
  'player_balance:increment_money': Api.incrementMoney,
  'player_balance:decrement_money': Api.decrementMoney,
}

export default PlayerBalanceApi
