import PlayerInventory from "../../PlayerInventory"
import {inventoryCheckItem} from "./InventoryCheckItem"

it('Checking check function', () => {
	const inventory = new PlayerInventory()

	expect(
		inventoryCheckItem({inventory}, {itemId: 1, quantity: 1})
	).toBeFalsy()

	inventory.addItem(1, 1)

	expect(
		inventoryCheckItem({inventory}, {itemId: 1, quantity: 1})
	).toBeTruthy()

	inventory.addItem(1, 1)

	expect(
		inventoryCheckItem({inventory}, {itemId: 1, quantity: 2})
	).toBeTruthy()
})
