import {Effect} from "../../../types/Effect"
import PlayerLevel from "../PlayerLevel"
import PlayerDamage from "../PlayerDamage"
import PlayerHealth from "../PlayerHealth"
import PlayerEnergy from "../PlayerEnergy"
import PlayerDefense from "../PlayerDefense"
import PlayerInventory from "../PlayerInventory"
import PlayerEquipment from "../PlayerEquipment"
import PlayerFavorites from "../PlayerFavorites"

class Player {
	public readonly level: PlayerLevel
	public readonly health: PlayerHealth
	public readonly energy: PlayerEnergy
	public readonly damage: PlayerDamage
	public readonly defense: PlayerDefense
	public readonly inventory: PlayerInventory
	public readonly equipment: PlayerEquipment
	public readonly favorites: PlayerFavorites

	constructor() {
		this.level = new PlayerLevel(100, 10)
		this.health = new PlayerHealth(50, 100)
		this.energy = new PlayerEnergy(50, 100)
		this.damage = new PlayerDamage(30, 50)
		this.defense = new PlayerDefense()
		this.inventory = new PlayerInventory()
		this.equipment = new PlayerEquipment()
		this.favorites = new PlayerFavorites()

		this.initPlayerHealth()
		this.initPlayerDamage()
		this.initPlayerEnergy()
		this.initPlayerDefense()
	}

	private initPlayerHealth() {
		this.health.setPlayerLevel(() => {
			return this.level.getLevel()
		})

		this.health.setMaxHealthEffect(() => {
			return Player.calculateEffect('maxHealth', [
				...this.equipment.getEffects()
			])
		})
	}

	private initPlayerEnergy() {
		this.energy.setPlayerLevel(() => {
			return this.level.getLevel()
		})

		this.energy.setMaxEnergyEffect(() => {
			return Player.calculateEffect('maxEnergy', [
				...this.equipment.getEffects()
			])
		})
	}

	private initPlayerDamage() {
		this.damage.setPlayerLevel(() => {
			return this.level.getLevel()
		})

		this.damage.setDamageEffect(() => {
			return Player.calculateEffect('damage', [
				...this.equipment.getEffects()
			])
		})
	}

	private initPlayerDefense() {
		this.defense.setPlayerLevel(() => {
			return this.level.getLevel()
		})

		this.defense.setDefenseEffect(() => {
			return Player.calculateEffect('defense', [
				...this.equipment.getEffects()
			])
		})
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

	static calculateEffect(effectName: string, effects: Effect[]) {
		let effectDefense = 0
		effects.map((item: Effect) => {
			if (item.type === effectName) {
				switch (item.operator) {
					case '+': effectDefense += item.value; break
					case '-': effectDefense -= item.value; break
					default: throw new Error('Not found operator: '+item.operator)
				}
			}
			return item
		})
		return effectDefense
	}
}

export default Player
