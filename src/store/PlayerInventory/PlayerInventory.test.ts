import ItemsManager from "../ItemsManager"
import PlayerInventory from './PlayerInventory'
import PlayerInventoryItem from "../PlayerInventoryItem"

describe('Check base function', () => {
	const itemManager = new ItemsManager()

	const item = itemManager.create(1)
	const inventoryItem = new PlayerInventoryItem({
		item,
		quantity: 1
	})

	it('Adding item', () => {
		const inventory = new PlayerInventory()

		inventory.addItem(item, 1)
		inventory.addItem(item, 1)
		inventory.addItem(item, 2)

		expect(inventory.getItem(item.id)?.getQuantity()).toBe(4)
	})

	it('Removing item', () => {
		const inventory = new PlayerInventory()

		inventory.addItem(item, 2)
		inventory.removeItem(item.id, 1)

		expect(inventory.getItem(item.id)).toStrictEqual(inventoryItem)
	})

	it('Getting inventory', () => {
		const inventory = new PlayerInventory()

		inventory.addItem(item, 1)

		const items = inventory.getInventory()

		expect(items).toStrictEqual([inventoryItem])
	})

	it('Remove last item', () => {
		const inventory = new PlayerInventory()

		inventory.addItem(item, 1)
		inventory.removeItem(item.id, 1)

		expect(inventory.getItem(item.id)).toBeUndefined()
	})

	it('Check exists item', () => {
		const inventory = new PlayerInventory()

		expect(inventory.existsItem(item.id)).toBeFalsy()
	})
})
