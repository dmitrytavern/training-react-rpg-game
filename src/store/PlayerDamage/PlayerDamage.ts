import {makeAutoObservable} from 'mobx'

function randomInteger(min: number, max: number) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

type ComputedProperties = 'getPlayerLevel' | 'getEffects'
type PlayerLevelFunction = () => number
type EffectsFunction = () => number

class PlayerDamage {
	private readonly minDamage: number
	private readonly maxDamage: number
	private getPlayerLevel: PlayerLevelFunction
	private getEffects: EffectsFunction

	constructor(minDamage: number, maxDamage: number) {
		this.minDamage = minDamage
		this.maxDamage = maxDamage
		this.getPlayerLevel = () => 1
		this.getEffects = () => 0

		makeAutoObservable<PlayerDamage, ComputedProperties>(this, {
			getPlayerLevel: false,
			getEffects: false
		})
	}

	public setPlayerLevel(computed: PlayerLevelFunction) {
		this.getPlayerLevel = computed
	}

	public setDamageEffect(computed: EffectsFunction) {
		this.getEffects = computed
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
		return dmg * this.getPlayerLevel() + this.getEffects()
	}
}

export default PlayerDamage
