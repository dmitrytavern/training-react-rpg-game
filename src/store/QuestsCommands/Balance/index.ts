import { checkMoney } from "./checkMoney"
import { checkMoneyGetting } from "./checkMoneyGetting"

export const actions = {
}

export const subscribes = {
	'balance:check_money_balance': checkMoney,
	'balance:check_money_getting': checkMoneyGetting
}

export const checkers = {
}