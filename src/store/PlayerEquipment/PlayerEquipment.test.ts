import PlayerEquipment from "./PlayerEquipment"
import ItemsManager from "../ItemsManager"

describe('Check effect getting', () => {
	const itemsManager = new ItemsManager()

	const helmet = itemsManager.create(4)
	const armor = itemsManager.create(5)
	const arms = itemsManager.create(7)
	const feet = itemsManager.create(6)
	const leftRing = itemsManager.create(8)
	const rightRing = itemsManager.create(9)
	const waist = itemsManager.create(10)

	it('Getting effects without equip', () => {
		const equipment = new PlayerEquipment()

		expect(equipment.getEffects()).toEqual([])
	})

	it('Getting effects with equip', () => {
		const equipment = new PlayerEquipment()

		equipment.helmetSlot.setEquipment(helmet)
		equipment.armorSlot.setEquipment(armor)
		equipment.armsSlot.setEquipment(arms)
		equipment.feetSlot.setEquipment(feet)
		equipment.leftRingSlot.setEquipment(leftRing)
		equipment.rightRingSlot.setEquipment(rightRing)
		equipment.waistSlot.setEquipment(waist)

		expect(equipment.getEffects()).toEqual([
			...leftRing.effects,
			...rightRing.effects,
			...waist.effects,
			...helmet.effects,
			...armor.effects,
			...arms.effects,
			...feet.effects,
		])
	})
})