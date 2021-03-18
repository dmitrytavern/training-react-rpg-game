import ItemsFactory from "../ItemsFactory"
import PlayerInventory from "../PlayerInventory"
import CraftMaterial from "./CraftMaterial"

const itemsFactory = new ItemsFactory()

it('Check available when item not exists', () => {
	const inventory = new PlayerInventory()
	const material = new CraftMaterial(inventory, 1)

	expect(material.isAvailable()).toBeFalsy()
})

it('Check available when item exists but lacks quantity', () => {
	const inventory = new PlayerInventory()
	const material = new CraftMaterial(inventory, 1)

	inventory.addItem(itemsFactory.create(1), 1)

	expect(material.isAvailable(2)).toBeFalsy()
})

it('Check available when item exists', () => {
	const inventory = new PlayerInventory()
	const material = new CraftMaterial(inventory, 1)

	inventory.addItem(itemsFactory.create(1), 1)

	expect(material.isAvailable()).toBeTruthy()

	inventory.addItem(itemsFactory.create(1), 1)

	expect(material.isAvailable()).toBeTruthy()
	expect(material.isAvailable(2)).toBeTruthy()
})