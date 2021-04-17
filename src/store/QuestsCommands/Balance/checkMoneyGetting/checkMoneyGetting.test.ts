import PlayerBalance from "../../../PlayerBalance"
import { checkMoneyGetting } from "./checkMoneyGetting"

it('Checking subscribe function', () => {
	const balance = new PlayerBalance({money: 0})

	checkMoneyGetting({balance}, 1, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

it('Checking subscribe function with default value', () => {
	const balance = new PlayerBalance({money: 0})

	balance.money.incrementMoney(1)

	checkMoneyGetting({balance}, 1, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

