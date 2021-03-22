import {reaction} from "mobx"
import PlayerBalance from "../../PlayerBalance"

interface CommandContext {
	balance?: PlayerBalance
}

export const balanceCheckMoney = (context: CommandContext, payload: number, callback: Function) => {
	const balance = context.balance

	if (!balance) {
		throw new Error('Inventory is undefined')
	}

	const money = () => balance.money.getMoneyInCoppers() >= payload

	const reactionDisposer = reaction(
		() => money(),
		isExists => {callback(isExists, reactionDisposer)}
	)

	callback(money(), reactionDisposer)
}