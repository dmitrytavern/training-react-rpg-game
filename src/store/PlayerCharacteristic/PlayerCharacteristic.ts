import {makeAutoObservable} from "mobx"

type ComputedProperties = 'getPlayerLevel'
type PlayerLevelFunction = () => number

interface Characteristics {
	strength: number
	constitution: number
}

const defaultCharacteristics = {
	strength: 1,
	constitution: 1
}

class PlayerCharacteristic {
	static minPoint: number = 2
	private characteristics: Characteristics
	private getPlayerLevel: PlayerLevelFunction

	constructor() {
		this.getPlayerLevel = () => 1
		this.characteristics = {...defaultCharacteristics}

		makeAutoObservable<PlayerCharacteristic, ComputedProperties>(this, {
			getPlayerLevel: false
		})
	}

	public setPlayerLevel(computed: PlayerLevelFunction) {
		this.getPlayerLevel = computed
	}

	public getCharacteristic(name: keyof Characteristics): number {
		return this.characteristics[name]
	}

	public getAllPoints(): number {
		const minPoints = PlayerCharacteristic.minPoint
		const levelPoints = this.getLevelPoints()

		return minPoints + levelPoints
	}

	public getAvailablePoints(): number {
		return this.getAllPoints() - this.getCharacteristicsPoints()
	}

	public setCustomCharacteristics(characteristics: Characteristics) {
		const minValue = PlayerCharacteristic.minPoint
		const newPoints = Object
			.values(characteristics)
			.reduce((prev, curr) => {
				if (prev <= 0) throw new Error('Characteristic value not be 0')
				return prev + curr
			})

		const allPoints = this.getLevelPoints() + minValue

		if (allPoints < newPoints) {
			throw new Error('Points do not correspond to the maximum amount')
		}

		if (newPoints < minValue) {
			throw new Error('Points do not correspond to the minimum amount')
		}

		this.characteristics = Object.assign({}, this.characteristics, characteristics)
	}

	public setPoint(name: keyof Characteristics): void {
		if (this.getAvailablePoints() === 0) {
			throw new Error('Not available points!')
		}

		if (this.characteristicLimitReached(name)) {
			throw new Error('Characteristic limit reached!')
		}

		this.characteristics[name] += 1
	}

	public unsetPoints() {
		this.characteristics = {...defaultCharacteristics}
	}

	public characteristicLimitReached(name: keyof Characteristics): boolean {
		return this.characteristics[name] === 10
	}

	private getLevelPoints(): number {
		const lvl = this.getPlayerLevel()
		let newPoints = 0

		let i = 1
		while (lvl >= i * 5) {
			newPoints++
			i++
		}

		return newPoints
	}

	private getCharacteristicsPoints() {
		return Object
			.values(this.characteristics)
			.reduce((prev, curr) => prev + curr)
	}
}

export default PlayerCharacteristic
