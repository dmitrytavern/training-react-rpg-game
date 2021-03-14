import {makeAutoObservable} from 'mobx'

function randomInteger(min: number, max: number) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

type ComputedProperties = 'getPlayerLevel' | 'getEffects' | 'getStrengthCharacteristic'
type PlayerLevelFunction = () => number
type EffectsFunction = () => number
type StrengthFunction = () => number

type ComputedNames = keyof ComputedFunctions
type ComputedFunctions = {
	level: PlayerLevelFunction
	effects: EffectsFunction
	strength: StrengthFunction
}

class PlayerDamage {
	private readonly minDamage: number
	private readonly maxDamage: number
	private getPlayerLevel: PlayerLevelFunction
	private getEffects: EffectsFunction
	private getStrengthCharacteristic: StrengthFunction

	constructor(minDamage: number, maxDamage: number) {
		this.minDamage = minDamage
		this.maxDamage = maxDamage
		this.getPlayerLevel = () => 1
		this.getEffects = () => 0
		this.getStrengthCharacteristic = () => 1

		makeAutoObservable<PlayerDamage, ComputedProperties>(this, {
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

	public getDamage(): number {
		return randomInteger(this.getMinDamage(), this.getMaxDamage())
	}

	public getMinDamage(): number {
		return this.calculateDamage(this.minDamage)
	}

	public getMaxDamage(): number {
		return this.calculateDamage(this.maxDamage)
	}

	private calculateDamage(dmg: number): number {
		return dmg * this.getPlayerLevel() * this.getStrengthCharacteristic() + this.getEffects()
	}
}

export default PlayerDamage
