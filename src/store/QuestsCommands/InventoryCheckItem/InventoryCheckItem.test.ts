import PlayerInventory from "../../PlayerInventory"
import {InventoryCheckItem} from "./InventoryCheckItem"

it('Checking check function', () => {
	const inventory = new PlayerInventory()
	const command = new InventoryCheckItem({
		inventory
	})

	expect(command.check({itemId: 1, quantity: 1})).toBeFalsy()

	inventory.addItem(1, 1)

	expect(command.check({itemId: 1, quantity: 1})).toBeTruthy()

	inventory.addItem(1, 1)

	expect(command.check({itemId: 1, quantity: 2})).toBeTruthy()
})
