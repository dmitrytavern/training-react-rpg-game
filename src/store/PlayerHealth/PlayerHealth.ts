import {makeAutoObservable} from 'mobx'

type ComputedProperties = 'getPlayerLevel' | 'getEffects'
type PlayerLevelFunction = () => number
type EffectsFunction = () => number

class PlayerHealth {
	private readonly maxHealth: number
	private health: number
	private getPlayerLevel: PlayerLevelFunction
	private getEffects: EffectsFunction

	constructor(startValue: number, maxValue: number) {
		this.health = startValue
		this.maxHealth = maxValue
		this.getPlayerLevel = () => 1
		this.getEffects = () => 0

		makeAutoObservable<PlayerHealth, ComputedProperties>(this, {
			getPlayerLevel: false,
			getEffects: false
		})
	}

	public setPlayerLevel(computed: PlayerLevelFunction) {
		this.getPlayerLevel = computed
	}

	public setMaxHealthEffect(computed: EffectsFunction) {
		this.getEffects = computed
	}

	public get alive(): boolean {
		return this.health > 0
	}

	public getHealth(): number {
		return this.health
	}

	public getMaxHealth(): number {
		return this.maxHealth * this.getPlayerLevel() + this.getEffects()
	}

	public incrementHealth(count: number): void {
		const max = this.getMaxHealth()
		let _val = this.health + count
		if (_val > max) _val = max
		this.health = _val
	}

	public decrementHealth(count: number): void {
		let _val = this.health - count
		if (_val < 0) _val = 0
		this.health = _val
	}
}

export default PlayerHealth
