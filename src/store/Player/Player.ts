import {Effect} from "../../../types/Effect"
import PlayerLevel from "../PlayerLevel"
import PlayerDamage from "../PlayerDamage"
import PlayerInventory from "../PlayerInventory"
import PlayerEquipment from "../PlayerEquipment"

class Player {
	public readonly level: PlayerLevel
	public readonly damage: PlayerDamage
	public readonly inventory: PlayerInventory
	public readonly equipment: PlayerEquipment

	constructor() {
		this.level = new PlayerLevel(1, 10)
		this.damage = new PlayerDamage(30, 50)
		this.inventory = new PlayerInventory()
		this.equipment = new PlayerEquipment()
	}

	public calculatePlayerDamage(): number {
		const baseDamage = this.damage.getDamage()
		const effects: Effect[] = [
			...this.equipment.getEffects()
		]

		let effectDamage = 0
		effects.map((item) => {
			if (item.type === 'damage') {
				switch (item.operator) {
					case '+': effectDamage += item.value; break
					case '-': effectDamage -= item.value; break
					case '%': effectDamage += item.value * baseDamage / 100; break
					default: throw new Error('Not found operator: '+item.operator)
				}
			}
			return item
		})

		return baseDamage + effectDamage
	}

	public calculateDamaging(damage: number): number {
		const effects: Effect[] = [
			...this.equipment.getEffects()
		]

		let effectDefense = 0
		effects.map((item) => {
			if (item.type === 'defense') {
				switch (item.operator) {
					case '+': effectDefense += item.value; break
					case '-': effectDefense -= item.value; break
					default: throw new Error('Not found operator: '+item.operator)
				}
			}
			return item
		})

		const value = damage - effectDefense
		return value <= 0 ? 1 : value
	}
}

export default Player
