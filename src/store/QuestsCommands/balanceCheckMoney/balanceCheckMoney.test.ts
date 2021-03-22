import PlayerBalance from "../../PlayerBalance"
import {balanceCheckMoney} from "./balanceCheckMoney"

it('Checking subscribe function', () => {
	const balance = new PlayerBalance({money: 0})

	balanceCheckMoney({balance}, 1, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

it('Checking subscribe function with default value', () => {
	const balance = new PlayerBalance({money: 0})

	balance.money.incrementMoney(1)

	balanceCheckMoney({balance}, 1, (value: boolean, disposer: Function) => {
		expect(value).toBeTruthy()
		disposer()
	})

	balance.money.incrementMoney(1)
	balance.money.decrementMoney(1)
})
