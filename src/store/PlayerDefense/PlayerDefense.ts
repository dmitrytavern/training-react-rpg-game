import {makeAutoObservable} from 'mobx'

type ComputedProperties = 'getPlayerLevel' | 'getEffects'
type PlayerLevelFunction = () => number
type EffectsFunction = () => number

class PlayerDefense {
	private getPlayerLevel: PlayerLevelFunction
	private getEffects: EffectsFunction

	constructor() {
		this.getPlayerLevel = () => 1
		this.getEffects = () => 0

		makeAutoObservable<PlayerDefense, ComputedProperties>(this, {
			getPlayerLevel: false,
			getEffects: false
		})
	}

	public setPlayerLevel(computed: PlayerLevelFunction) {
		this.getPlayerLevel = computed
	}

	public setDefenseEffect(computed: EffectsFunction) {
		this.getEffects = computed
	}

	public getDefense(): number {
		return this.getEffects()
	}

	public getDefensePercent(): number {
		const def = this.getEffects()
		if (def === 0) return 0
		return +(this.getPlayerLevel() * 0.1 + 50 * def / (1500 + def)).toFixed(2)
	}
}

export default PlayerDefense
