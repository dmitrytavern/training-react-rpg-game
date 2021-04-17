import {reaction} from "mobx"
import PlayerBalance from "../../../PlayerBalance"

interface CommandContext {
	balance?: PlayerBalance
}

export const checkMoneyGetting = (context: CommandContext, payload: number, callback: Function) => {
	const balance = context.balance

	if (!balance) {
		throw new Error('Inventory is undefined')
	}

	let moneyBalance = balance.money.getMoneyInCoppers()
	let value = 0

	const fun = () => {
		const newBalance = balance.money.getMoneyInCoppers()
		const difference = newBalance - moneyBalance

		if (difference > 0) {
			value += difference
			moneyBalance = newBalance
		}

		return value >= payload
	}

	const reactionDisposer = reaction(
		() => fun(),
		isExists => {callback(isExists, reactionDisposer)}
	)

	callback(fun(), reactionDisposer)
}