import {Effect} from "../../../types/Effect"
import PlayerLevel from "../PlayerLevel"
import PlayerDamage from "../PlayerDamage"
import PlayerHealth from "../PlayerHealth"
import PlayerEnergy from "../PlayerEnergy"
import PlayerDefense from "../PlayerDefense"
import PlayerInventory from "../PlayerInventory"
import PlayerEquipment from "../PlayerEquipment"
import PlayerFavorites from "../PlayerFavorites"
import PlayerCharacteristic from "../PlayerCharacteristic"

class Player {
	public readonly level: PlayerLevel
	public readonly health: PlayerHealth
	public readonly energy: PlayerEnergy
	public readonly damage: PlayerDamage
	public readonly defense: PlayerDefense
	public readonly inventory: PlayerInventory
	public readonly equipment: PlayerEquipment
	public readonly favorites: PlayerFavorites
	public readonly characteristic: PlayerCharacteristic

	constructor() {
		this.level = new PlayerLevel(50, 10)
		this.health = new PlayerHealth(5000, 100)
		this.energy = new PlayerEnergy(50, 100)
		this.damage = new PlayerDamage(30, 50)
		this.defense = new PlayerDefense()
		this.inventory = new PlayerInventory()
		this.equipment = new PlayerEquipment()
		this.favorites = new PlayerFavorites()
		this.characteristic = new PlayerCharacteristic()

		this.initPlayerLevel()
		this.initPlayerHealth()
		this.initPlayerDamage()
		this.initPlayerEnergy()
		this.initPlayerDefense()
		this.initPlayerCharacteristic()
	}

	private initPlayerLevel() {
		this.level.setComputedFunction('intelligence', () => {
			return this.characteristic.getCharacteristic('intelligence')
		})
	}

	private initPlayerHealth() {
		this.health.setComputedFunction('level', () => {
			return this.level.getLevel()
		})

		this.health.setComputedFunction('effects', () => {
			return Player.calculateEffect('maxHealth', [
				...this.equipment.getEffects()
			])
		})

		this.health.setComputedFunction('endurance', () => {
			return this.characteristic.getCharacteristic('endurance')
		})
	}

	private initPlayerEnergy() {
		this.energy.setComputedFunction('level', () => {
			return this.level.getLevel()
		})

		this.energy.setComputedFunction('effects', () => {
			return Player.calculateEffect('maxEnergy', [
				...this.equipment.getEffects()
			])
		})

		this.energy.setComputedFunction('endurance', () => {
			return this.characteristic.getCharacteristic('endurance')
		})
	}

	private initPlayerDamage() {
		this.damage.setComputedFunction('level', () => {
			return this.level.getLevel()
		})

		this.damage.setComputedFunction('effects', () => {
			return Player.calculateEffect('damage', [
				...this.equipment.getEffects()
			])
		})

		this.damage.setComputedFunction('strength', () => {
			return this.characteristic.getCharacteristic('strength')
		})
	}

	private initPlayerDefense() {
		this.defense.setComputedFunction('level',() => {
			return this.level.getLevel()
		})

		this.defense.setComputedFunction('effects',() => {
			return Player.calculateEffect('defense', [
				...this.equipment.getEffects()
			])
		})

		this.defense.setComputedFunction('strength', () => {
			return this.characteristic.getCharacteristic('strength')
		})
	}

	private initPlayerCharacteristic() {
		this.characteristic.setComputedFunction('level', () => {
			return this.level.getLevel()
		})
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
