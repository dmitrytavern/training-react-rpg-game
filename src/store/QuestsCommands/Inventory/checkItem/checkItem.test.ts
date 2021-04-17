import PlayerInventory from "../../../PlayerInventory"
import {
	checkItem,
	subscribeCheckItem
} from "./checkItem"

it('Checking checker function', () => {
	const inventory = new PlayerInventory()
	const data = {itemId: 1, quantity: 1}

	expect(checkItem({inventory}, data)).toBeFalsy()

	inventory.addItem(1, 1)

	expect(checkItem({inventory}, data)).toBeTruthy()

	inventory.addItem(1, 1)

	expect(checkItem({inventory}, data)).toBeTruthy()
})

it('Checking subscribe function', () => {
	const inventory = new PlayerInventory()

	subscribeCheckItem({inventory}, {itemId: 1, quantity: 1}, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

it('Checking subscribe function with default value', () => {
	const inventory = new PlayerInventory()

	inventory.addItem(1, 1)

	subscribeCheckItem({inventory}, {itemId: 1, quantity: 1}, (value: boolean, disposer: Function) => {
		expect(value).toBeTruthy()
		disposer()
	})

	inventory.addItem(1, 1)
	inventory.removeItem(1, 1)
})
