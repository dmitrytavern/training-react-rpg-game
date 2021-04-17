import PlayerInventory from "../../../PlayerInventory"
import { addItem } from "./addItem"

it('Checking execute function', () => {
	const inventory = new PlayerInventory()

	addItem({inventory}, {itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 1)).toBeTruthy()

	addItem({inventory}, {itemId: 1, quantity: 1})

	expect(inventory.existsItem(1, 2)).toBeTruthy()
})