import {makeAutoObservable} from 'mobx'

type ComputedProperties = 'getPlayerLevel' | 'getEffects'
type PlayerLevelFunction = () => number
type EffectsFunction = () => number

class PlayerEnergy {
	private readonly maxEnergy: number
	private energy: number
	private getPlayerLevel: PlayerLevelFunction
	private getEffects: EffectsFunction

	constructor(startValue: number, maxValue: number) {
		this.energy = startValue
		this.maxEnergy = maxValue
		this.getPlayerLevel = () => 1
		this.getEffects = () => 0

		makeAutoObservable<PlayerEnergy, ComputedProperties>(this, {
			getPlayerLevel: false,
			getEffects: false
		})
	}

	public setPlayerLevel(computed: PlayerLevelFunction) {
		this.getPlayerLevel = computed
	}

	public setMaxEnergyEffect(computed: EffectsFunction) {
		this.getEffects = computed
	}

	public getEnergy(): number {
		return this.energy
	}

	public getMaxEnergy(): number {
		return this.maxEnergy * this.getPlayerLevel() + this.getEffects()
	}

	public incrementHealth(count: number): void {
		const max = this.getMaxEnergy()
		let _val = this.energy + count
		if (_val > max) _val = max
		this.energy = _val
	}

	public decrementHealth(count: number): void {
		let _val = this.energy - count
		if (_val < 0) _val = 0
		this.energy = _val
	}
}

export default PlayerEnergy
