import PlayerInventory from "../../PlayerInventory"
import {inventoryCheckItem} from "./InventoryCheckItem"

it('Checking subscribe function', () => {
	const inventory = new PlayerInventory()

	inventoryCheckItem({inventory}, {itemId: 1, quantity: 1}, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

it('Checking subscribe function with default value', () => {
	const inventory = new PlayerInventory()

	inventory.addItem(1, 1)

	inventoryCheckItem({inventory}, {itemId: 1, quantity: 1}, (value: boolean, disposer: Function) => {
		expect(value).toBeTruthy()
		disposer()
	})

	inventory.addItem(1, 1)
	inventory.removeItem(1, 1)
})
