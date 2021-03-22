import PlayerBalance from "../../PlayerBalance"
import {balanceCheckMoneyGetting} from "./balanceCheckMoneyGetting"

it('Checking subscribe function', () => {
	const balance = new PlayerBalance({money: 0})

	balanceCheckMoneyGetting({balance}, 1, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

it('Checking subscribe function with default value', () => {
	const balance = new PlayerBalance({money: 0})

	balance.money.incrementMoney(1)

	balanceCheckMoneyGetting({balance}, 1, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

