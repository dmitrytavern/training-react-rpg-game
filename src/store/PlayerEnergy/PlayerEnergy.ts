import {makeAutoObservable} from 'mobx'

class PlayerEnergy {
	private readonly maxEnergy: number
	private energy: number

	constructor(startValue: number, maxValue: number) {
		this.energy = startValue
		this.maxEnergy = maxValue

		makeAutoObservable(this)
	}

	public getEnergy(): number {
		return this.energy
	}

	public getMaxEnergy(): number {
		return this.maxEnergy
	}

	public incrementHealth(count: number): void {
		let _val = this.energy + count
		if (_val > this.maxEnergy) _val = this.maxEnergy
		this.energy = _val
	}

	public decrementHealth(count: number): void {
		let _val = this.energy - count
		if (_val < 0) _val = 0
		this.energy = _val
	}
}

export default PlayerEnergy
