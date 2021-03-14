import {makeAutoObservable} from 'mobx'

interface Money {
	gold: number
	silver: number
	copper: number
}

class PlayerBalanceMoney {
	private money: number

	constructor(startValue: number) {
		this.money = startValue

		makeAutoObservable(this)
	}

	public getMoney(): Money {
		let gold = 0
		let silver = 0
		let copper = this.money

		while (copper >= 100) {
			copper -= 100
			silver++

			if (silver >= 100) {
				silver -= 100
				gold++
			}
		}

		return {
			gold,
			silver,
			copper
		}
	}

	public incrementMoney(count: number) {
		this.money += count
	}

	public decrementMoney(count: number) {
		let _val = this.money - count
		if (_val < 0) _val = 0
		this.money = _val
	}
}

export default PlayerBalanceMoney
