import {makeAutoObservable} from 'mobx'

function randomInteger(min: number, max: number) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

type ComputedProperties = 'getPlayerLevel' | 'getEffects' | 'getStrengthCharacteristic'
type PlayerLevelFunction = () => number
type EffectsFunction = () => number
type StrengthFunction = () => number

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

	public setPlayerLevel(computed: PlayerLevelFunction) {
		this.getPlayerLevel = computed
	}

	public setDamageEffect(computed: EffectsFunction) {
		this.getEffects = computed
	}

	public setStrengthCharacteristic(computed: StrengthFunction) {
		this.getStrengthCharacteristic = computed
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
