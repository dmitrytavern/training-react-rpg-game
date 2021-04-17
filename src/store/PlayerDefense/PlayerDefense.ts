import { makeAutoObservable } from 'mobx'
import {
	ComputedProperties,
	PlayerLevelFunction,
	EffectsFunction,
	StrengthFunction,
	ComputedNames,
	ComputedFunctions
} from './types'

class PlayerDefense {
	private getPlayerLevel: PlayerLevelFunction
	private getEffects: EffectsFunction
	private getStrengthCharacteristic: StrengthFunction

	constructor() {
		this.getPlayerLevel = () => 1
		this.getEffects = () => 0
		this.getStrengthCharacteristic = () => 1

		makeAutoObservable<PlayerDefense, ComputedProperties>(this, {
			getPlayerLevel: false,
			getEffects: false,
			getStrengthCharacteristic: false
		})
	}

	public setComputedFunction(name: ComputedNames, computed: ComputedFunctions[ComputedNames]) {
		if (typeof computed !== 'function') return
		switch (name) {
			case "level": this.getPlayerLevel = computed; break;
			case "effects": this.getEffects = computed; break;
			case "strength": this.getStrengthCharacteristic = computed; break;
		}
	}

	public calculateDamaging(damage: number): number {
		const percent = this.getDefensePercent()

		return +(damage / 100 * (100 - percent)).toFixed()
	}

	public getDefense(): number {
		return this.getEffects() + this.getBaseDefense()
	}

	public getDefensePercent(): number {
		const lvl = this.getPlayerLevel()
		const def = this.getEffects() + this.getBaseDefense()

		return +(lvl * 0.1 + 50 * def / (1500 + def)).toFixed(2)
	}

	private getBaseDefense(): number {
		return this.getPlayerLevel() * 5 * this.getStrengthCharacteristic()
	}
}

export default PlayerDefense
