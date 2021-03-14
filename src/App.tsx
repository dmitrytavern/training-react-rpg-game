import { observer } from 'mobx-react-lite'
import { usePlayerStore } from "./contexts/playerStoreContext"
import ItemsManager from "./store/ItemsManager"

const itemsManager = new ItemsManager()
const App = () => {
	const player = usePlayerStore()

	const level = player.level.getLevel()
	const xp = player.level.getExperience()
	const maxEp = player.level.getExperienceForLevelUp()

	const addExp = () => {
		player.level.addExperience(50)
		player.level.floatExperience()
	}

	const addExpWithCalc = () => {
		const exp = player.level.calculateExperience(50)
		player.level.addExperience(exp)
		player.level.floatExperience()
	}

	const alive = player.health.alive
	const health = player.health.getHealth()
	const maxHealth = player.health.getMaxHealth()

	const energy = player.energy.getEnergy()
	const maxEnergy = player.energy.getMaxEnergy()

	const minDamage = player.damage.getMinDamage()
	const maxDamage = player.damage.getMaxDamage()

	const getHit = () => {
		const damage = player.defense.calculateDamaging(500)
		player.health.decrementHealth(damage)
	}

	const defenceNumber = player.defense.getDefense()
	const defencePercent = player.defense.getDefensePercent()

	const characteristic = player.characteristic
	const allCharacteristicPoints = characteristic.getAllPoints()
	const availableCharacteristicPoints = characteristic.getAvailablePoints()

	const addCharacteristicPoint = (name: any) => {
		characteristic.setPoint(name)
	}
	const unsetAllPoints = () => {
		characteristic.unsetPoints()
	}
	const disabledCharacteristicButton = (name: any) => {
		return characteristic.characteristicLimitReached(name) || characteristic.getAvailablePoints() === 0
	}

	const inventory = player.inventory.getInventory()

	const addItem = () => {
		const item = itemsManager.create(1)
		player.inventory.addItem(item, 1)
	}

	const removeItem = () => {
		player.inventory.removeItem(1, 1)
	}

	const addItemToFavorite = (id: number) => {
		player.favorites.setItem(id)
	}

	const unsetItemFromFavorite = (id: number) => {
		player.favorites.unsetItem(id)
	}


	const equipment = player.equipment

	const setWeapon = () => {
		const weapon = itemsManager.create(1)
		equipment.weapon.setEquipment(weapon)
	}
	const setHelmet = () => {
		const helmet = itemsManager.create(4)
		equipment.helmetSlot.setEquipment(helmet)
	}
	const setArmor = () => {
		const armor = itemsManager.create(5)
		equipment.armorSlot.setEquipment(armor)
	}
	const setBoots = () => {
		const boots = itemsManager.create(6)
		equipment.bootsSlot.setEquipment(boots)
	}
	const unsetWeapon = () => {
		equipment.weapon.unsetEquipment()
	}
	const unsetHelmet = () => {
		equipment.helmetSlot.unsetEquipment()
	}
	const unsetArmor = () => {
		equipment.armorSlot.unsetEquipment()
	}
	const unsetBoots = () => {
		equipment.bootsSlot.unsetEquipment()
	}

	return (
		<div>

			<div>You are {alive ? 'alive' : 'death'}</div>
			<div>Your level: {level}</div>
			<div>Your xp: {xp}/{maxEp}</div>

			<div>Your health: {health}/{maxHealth}</div>
			<div>Your energy: {energy}/{maxEnergy}</div>

			<div>Your damage: {minDamage} - {maxDamage}</div>
			<div>Your defense: {defenceNumber} or {defencePercent}%</div>

			<button onClick={addExp}>Add 50 xp</button>
			<button onClick={addExpWithCalc}>Add 50 xp with calc</button>
			<button onClick={getHit}>Get 500 damage</button>

			<div>Your characteristic: </div>
			<div>All: {allCharacteristicPoints}</div>
			<div>Available: {availableCharacteristicPoints}</div>

			<button onClick={unsetAllPoints}>Rest</button>

			<ul>
				<li>
					Strength: {characteristic.getCharacteristic('strength')}/10
					|
					<button onClick={() => addCharacteristicPoint('strength')} disabled={disabledCharacteristicButton('strength')}>+1</button>
				</li>
				<li>
					Endurance: {characteristic.getCharacteristic('endurance')}/10
					|
					<button onClick={() => addCharacteristicPoint('endurance')} disabled={disabledCharacteristicButton('endurance')}>+1</button>
				</li>
				<li>
					Intelligence: {characteristic.getCharacteristic('intelligence')}/10
					|
					<button onClick={() => addCharacteristicPoint('intelligence')} disabled={disabledCharacteristicButton('intelligence')}>+1</button>
				</li>
			</ul>

			<div>Your inventory: </div>
			<ul>
				{inventory.map((item, i) => (
					<li key={i}>
						<span>{item.item.name} x{item.getQuantity()}</span>
						|
						<button onClick={() => addItemToFavorite(item.id)} disabled={player.favorites.exists(item.id)}>Add to favorite</button>
						<button onClick={() => unsetItemFromFavorite(item.id)} disabled={!player.favorites.exists(item.id)}>Unset from favorite</button>
					</li>
				))}
			</ul>

			<div>Your favorite items: </div>
			<ul>
				{player.favorites.getItems().map((id, i) => {
					const item = player.inventory.getItem(id)
					if (!item) return null
					return (
						<li key={i}>{item.item.name} x{item.getQuantity()}</li>
					)
				})}
			</ul>

			<button onClick={addItem}>Add 1 Sword</button>
			<button onClick={removeItem} disabled={!player.inventory.getItem(1)}>Remove 1 Sword</button>

			<div>Your equipment: </div>
			<div>
				Weapon: {equipment.weapon.getName()}
				|
				<button onClick={setWeapon} disabled={equipment.weapon.existsEquipment()}>Set weapon</button>
				<button onClick={unsetWeapon} disabled={!equipment.weapon.existsEquipment()}>Unset weapon</button>
			</div>
			<div>
				Helmet: {equipment.helmetSlot.getName()}
				|
				<button onClick={setHelmet} disabled={equipment.helmetSlot.existsEquipment()}>Set helmet</button>
				<button onClick={unsetHelmet} disabled={!equipment.helmetSlot.existsEquipment()}>Unset helmet</button>
			</div>
			<div>
				Armor: {equipment.armorSlot.getName()}
				|
				<button onClick={setArmor} disabled={equipment.armorSlot.existsEquipment()}>Set armor</button>
				<button onClick={unsetArmor} disabled={!equipment.armorSlot.existsEquipment()}>Unset armor</button>
			</div>
			<div>
				Boots: {equipment.bootsSlot.getName()}
				|
				<button onClick={setBoots} disabled={equipment.bootsSlot.existsEquipment()}>Set boots</button>
				<button onClick={unsetBoots} disabled={!equipment.bootsSlot.existsEquipment()}>Unset boots</button>
			</div>

		</div>
	)
}

export default observer(App)
