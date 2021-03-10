import { usePlayerStore } from "./contexts/playerStoreContext"
import ItemsManager from "./store/ItemsManager"

const itemsManager = new ItemsManager()
const App = () => {
	const player = usePlayerStore()

	player.equipment.weapon.setEquipment(
		itemsManager.create(1)
	)

	player.equipment.helmetSlot.setEquipment(
		itemsManager.create(4)
	)

	player.equipment.armorSlot.setEquipment(
		itemsManager.create(5)
	)

	console.log(
		player.calculatePlayerDamage(),
		player.calculateDamaging(10)
	)

	return (
		<div>

		</div>
	)
}

export default App
