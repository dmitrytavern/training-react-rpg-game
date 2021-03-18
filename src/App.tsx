import { observer } from 'mobx-react-lite'
import { usePlayerStore } from "./contexts/playerStoreContext"
import { useItemsFactoryStore } from "./contexts/itemsFactoryStoreContext";

const App = () => {
	const itemsFactory = useItemsFactoryStore()
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


	const balance = player.balance
	const balanceMoney = balance.money.getMoney()

	const addMoney = (count: number) => {
		balance.money.incrementMoney(count)
	}

	const removeMoney = (count: number) => {
		balance.money.decrementMoney(count)
	}

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
		player.inventory.addItem(1, 1)
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

	const setWeapon = () => {equipment.weapon.setEquipment(itemsFactory.create(1, 'weapon'))}
	const setHelmet = () => {equipment.helmetSlot.setEquipment(itemsFactory.create(4, 'armor'))}
	const setArmor = () => {equipment.armorSlot.setEquipment(itemsFactory.create(5, 'armor'))}
	const setArms = () => {equipment.armsSlot.setEquipment(itemsFactory.create(7, 'armor'))}
	const setFeet = () => {equipment.feetSlot.setEquipment(itemsFactory.create(6, 'armor'))}
	const setLeftRing = () => {equipment.leftRingSlot.setEquipment(itemsFactory.create(8, 'armor'))}
	const setRightRing = () => {equipment.rightRingSlot.setEquipment(itemsFactory.create(9, 'armor'))}
	const setWaist = () => {equipment.waistSlot.setEquipment(itemsFactory.create(10, 'armor'))}

	const unsetWeapon = () => {equipment.weapon.unsetEquipment()}
	const unsetHelmet = () => {equipment.helmetSlot.unsetEquipment()}
	const unsetArmor = () => {equipment.armorSlot.unsetEquipment()}
	const unsetArms = () => {equipment.armsSlot.unsetEquipment()}
	const unsetFeet = () => {equipment.feetSlot.unsetEquipment()}
	const unsetLeftRing = () => {equipment.leftRingSlot.unsetEquipment()}
	const unsetRightRing = () => {equipment.rightRingSlot.unsetEquipment()}
	const unsetWaist = () => {equipment.waistSlot.unsetEquipment()}

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

			<div>Your balance:</div>
			<div>
				Money:
				{balanceMoney.gold !== 0 && <span> {balanceMoney.gold} gold </span>}
				{balanceMoney.silver !== 0 && <span> {balanceMoney.silver} silvers </span>}
				<span> {balanceMoney.copper} coppers </span>
				<button onClick={() => addMoney(1)}>Add 1 copper</button>
				<button onClick={() => addMoney(100)}>Add 1 silver</button>
				<button onClick={() => addMoney(10000)}>Add 1 gold</button>
				<button onClick={() => removeMoney(1)} disabled={balanceMoney.copper === 0 && balanceMoney.silver === 0 && balanceMoney.gold === 0}>Remove 1 copper</button>
				<button onClick={() => removeMoney(100)} disabled={balanceMoney.silver === 0 && balanceMoney.gold === 0}>Remove 1 silver</button>
				<button onClick={() => removeMoney(10000)} disabled={balanceMoney.gold === 0}>Remove 1 gold</button>
			</div>

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
				Feet: {equipment.feetSlot.getName()}
				|
				<button onClick={setFeet} disabled={equipment.feetSlot.existsEquipment()}>Set boots</button>
				<button onClick={unsetFeet} disabled={!equipment.feetSlot.existsEquipment()}>Unset boots</button>
			</div>
			<div>
				Arms: {equipment.armsSlot.getName()}
				|
				<button onClick={setArms} disabled={equipment.armsSlot.existsEquipment()}>Set arms</button>
				<button onClick={unsetArms} disabled={!equipment.armsSlot.existsEquipment()}>Unset arms</button>
			</div>
			<div>
				Left Ring: {equipment.leftRingSlot.getName()}
				|
				<button onClick={setLeftRing} disabled={equipment.leftRingSlot.existsEquipment()}>Set left ring</button>
				<button onClick={unsetLeftRing} disabled={!equipment.leftRingSlot.existsEquipment()}>Unset left ring</button>
			</div>
			<div>
				Right Ring: {equipment.rightRingSlot.getName()}
				|
				<button onClick={setRightRing} disabled={equipment.rightRingSlot.existsEquipment()}>Set right ring</button>
				<button onClick={unsetRightRing} disabled={!equipment.rightRingSlot.existsEquipment()}>Unset right ring</button>
			</div>
			<div>
				Waist: {equipment.waistSlot.getName()}
				|
				<button onClick={setWaist} disabled={equipment.waistSlot.existsEquipment()}>Set waist</button>
				<button onClick={unsetWaist} disabled={!equipment.waistSlot.existsEquipment()}>Unset waist</button>
			</div>

		</div>
	)
}

export default observer(App)
