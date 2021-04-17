import PlayerBalance from '../../../PlayerBalance'

interface CommandContext {
  balance?: PlayerBalance
}

export const checkMoney = (context: CommandContext, payload: number) => {
  const balance = context.balance

  if (!balance) {
    throw new Error('Inventory is undefined')
  }

  return balance.money.getMoneyInCoppers() >= payload
}
