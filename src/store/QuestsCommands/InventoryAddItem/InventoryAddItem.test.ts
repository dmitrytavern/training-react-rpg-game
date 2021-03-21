import PlayerInventory from "../../PlayerInventory"
import {inventoryAddItem} from "./InventoryAddItem"

it('Checking execute function', () => {
	const inventory = new PlayerInventory()

	inventoryAddItem({inventory}, {itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 1)).toBeTruthy()

	inventoryAddItem({inventory}, {itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 2)).toBeTruthy()
})