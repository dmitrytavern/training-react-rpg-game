import {makeAutoObservable} from 'mobx'

type ComputedProperties = 'getIntelligenceCharacteristic'
type IntelligenceFunction = () => number

class PlayerLevel {
	private level: number
	private experience: number
	private experienceForLevelUp: number
	private getIntelligenceCharacteristic: IntelligenceFunction

	constructor(startLevel: number, startExp: number) {
		this.level = startLevel
		this.experience = startExp
		this.experienceForLevelUp = this._calcExperienceForLevelUp()
		this.getIntelligenceCharacteristic = () => 1

		this.floatExperience()

		makeAutoObservable<PlayerLevel, ComputedProperties>(this, {
			getIntelligenceCharacteristic: false
		})
	}

	public setIntelligenceCharacteristic(computed: IntelligenceFunction) {
		this.getIntelligenceCharacteristic = computed
	}

	public getLevel(): number {
		return this.level
	}

	public getExperience(): number {
		return this.experience
	}

	public getExperienceForLevelUp(): number {
		return this.experienceForLevelUp
	}

	public addExperience(exp: number): void {
		this.experience += exp
	}

	public calculateExperience(exp: number): number {
		const percent = this.getIntelligenceCharacteristic() * 5

		return exp + (exp / 100 * percent)
	}

	public floatExperience(): void {
		while (this.experience >= this.experienceForLevelUp) {
			this._toLevelUp()
		}
	}


	private _toLevelUp(): void {
		if (this.experience < this.experienceForLevelUp) throw new Error('Level up for player is impossible!')

		this.experience -= this.experienceForLevelUp
		this.level += 1
		this.experienceForLevelUp = this._calcExperienceForLevelUp()
	}

	private _calcExperienceForLevelUp(): number {
		return this.level * 100
	}
}

export default PlayerLevel
