import PlayerInventory from "../../PlayerInventory"
import {InventoryAddItem} from "./InventoryAddItem"

it('Checking execute function', () => {
	const inventory = new PlayerInventory()
	const command = new InventoryAddItem({
		inventory
	})

	command.execute({itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 1)).toBeTruthy()

	command.execute({itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 2)).toBeTruthy()
})