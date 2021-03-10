import {makeAutoObservable} from 'mobx'

class PlayerHealth {
	private readonly maxHealth: number
	private health: number

	constructor(startValue: number, maxValue: number) {
		this.health = startValue
		this.maxHealth = maxValue // DELETE IT!

		makeAutoObservable(this)
	}

	public get alive(): boolean {
		return this.health > 0
	}

	public getHealth() {
		return this.health
	}

	public getMaxHealth() {
		return this.maxHealth
	}

	public incrementHealth(count: number): void {
		let _val = this.health + count
		if (_val > this.maxHealth) _val = this.maxHealth
		this.health = _val
	}

	public decrementHealth(count: number): void {
		let _val = this.health - count
		if (_val < 0) _val = 0
		this.health = _val
	}
}

export default PlayerHealth
