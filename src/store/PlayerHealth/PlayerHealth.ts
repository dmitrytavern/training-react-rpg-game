import {makeAutoObservable} from 'mobx'
import {
	ComputedProperties,
	PlayerLevelFunction,
	EffectsFunction,
	EnduranceFunction,
	ComputedNames,
	ComputedFunctions
} from './types'

class PlayerHealth {
	private readonly maxHealth: number
	private health: number
	private getPlayerLevel: PlayerLevelFunction
	private getEffects: EffectsFunction
	private getEnduranceCharacteristic: EnduranceFunction

	constructor(startValue: number, maxValue: number) {
		this.health = startValue
		this.maxHealth = maxValue
		this.getPlayerLevel = () => 1
		this.getEffects = () => 0
		this.getEnduranceCharacteristic = () => 1

		makeAutoObservable<PlayerHealth, ComputedProperties>(this, {
			getPlayerLevel: false,
			getEffects: false,
			getEnduranceCharacteristic: false
		})
	}

	public setComputedFunction(name: ComputedNames, computed: ComputedFunctions[ComputedNames]) {
		if (typeof computed !== 'function') return
		switch (name) {
			case "level": this.getPlayerLevel = computed; break;
			case "effects": this.getEffects = computed; break;
			case "endurance": this.getEnduranceCharacteristic = computed; break;
		}
	}

	public get alive(): boolean {
		return this.health > 0
	}

	public getHealth(): number {
		return this.health
	}

	public getMaxHealth(): number {
		return this.maxHealth * this.getPlayerLevel() * this.getEnduranceCharacteristic() + this.getEffects()
	}

	public incrementHealth(count: number): void {
		const max = this.getMaxHealth()
		let _val = this.health + count
		if (_val > max) _val = max
		this.health = +(_val).toFixed(2)
	}

	public decrementHealth(count: number): void {
		let _val = this.health - count
		if (_val < 0) _val = 0
		this.health = +(_val).toFixed(2)
	}
}

export default PlayerHealth
