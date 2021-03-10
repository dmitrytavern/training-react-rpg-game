import PlayerEquipment from "./PlayerEquipment"
import ItemsManager from "../ItemsManager"

describe('Check effect getting', () => {
	const itemsManager = new ItemsManager()

	const helmet = itemsManager.create(4)
	const armor = itemsManager.create(5)
	const boots = itemsManager.create(6)

	it('Getting effects without equip', () => {
		const equipment = new PlayerEquipment()

		expect(equipment.getEffects()).toEqual([])
	})

	it('Getting effects with equip', () => {
		const equipment = new PlayerEquipment()

		equipment.helmetSlot.setEquipment(helmet)
		equipment.armorSlot.setEquipment(armor)
		equipment.bootsSlot.setEquipment(boots)

		expect(equipment.getEffects()).toEqual([
			...helmet.effects,
			...armor.effects,
			...boots.effects,
		])
	})
})