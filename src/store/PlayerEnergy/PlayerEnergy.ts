import {makeAutoObservable} from 'mobx'

type ComputedProperties = 'getPlayerLevel' | 'getEffects' | 'getEnduranceCharacteristic'
type PlayerLevelFunction = () => number
type EffectsFunction = () => number
type EnduranceFunction = () => number

class PlayerEnergy {
	private readonly maxEnergy: number
	private energy: number
	private getPlayerLevel: PlayerLevelFunction
	private getEffects: EffectsFunction
	private getEnduranceCharacteristic: EnduranceFunction

	constructor(startValue: number, maxValue: number) {
		this.energy = startValue
		this.maxEnergy = maxValue
		this.getPlayerLevel = () => 1
		this.getEffects = () => 0
		this.getEnduranceCharacteristic = () => 1

		makeAutoObservable<PlayerEnergy, ComputedProperties>(this, {
			getPlayerLevel: false,
			getEffects: false,
			getEnduranceCharacteristic: false
		})
	}

	public setPlayerLevel(computed: PlayerLevelFunction) {
		this.getPlayerLevel = computed
	}

	public setMaxEnergyEffect(computed: EffectsFunction) {
		this.getEffects = computed
	}

	public setEnduranceCharacteristic(computed: EnduranceFunction) {
		this.getEnduranceCharacteristic = computed
	}

	public getEnergy(): number {
		return this.energy
	}

	public getMaxEnergy(): number {
		return this.maxEnergy * this.getPlayerLevel() * this.getEnduranceCharacteristic() + this.getEffects()
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
