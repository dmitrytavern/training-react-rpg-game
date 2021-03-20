import PlayerInventory from "../../PlayerInventory"
import {InventoryRemoveItem} from "./InventoryRemoveItem"

it('Checking execute function', () => {
	const inventory = new PlayerInventory()
	const command = new InventoryRemoveItem({
		inventory
	})

	inventory.addItem(1, 2)

	command.execute({itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 1)).toBeTruthy()

	command.execute({itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 1)).toBeFalsy()
})