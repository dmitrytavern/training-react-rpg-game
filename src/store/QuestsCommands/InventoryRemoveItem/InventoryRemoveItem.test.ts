import PlayerInventory from "../../PlayerInventory"
import {inventoryRemoveItem} from "./InventoryRemoveItem"

it('Checking execute function', () => {
	const inventory = new PlayerInventory()

	inventory.addItem(1, 2)

	inventoryRemoveItem({inventory}, {itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 1)).toBeTruthy()

	inventoryRemoveItem({inventory}, {itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 1)).toBeFalsy()
})