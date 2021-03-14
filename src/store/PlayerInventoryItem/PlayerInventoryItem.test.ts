import ItemsManager from "../ItemsManager"
import PlayerInventoryItem from "./PlayerInventoryItem"

describe('Check default properties', () => {
	const itemManager = new ItemsManager()
	const item = new PlayerInventoryItem({
		item: itemManager.create(1),
		quantity: 1
	})

	it('Check quantity', () => {
		expect(item.getQuantity()).toBe(1)
	})
})

describe('Check increment functions', () => {
	const itemManager = new ItemsManager()
	const item = new PlayerInventoryItem({
		item: itemManager.create(1),
		quantity: 1
	})

	it('Increment one', () => {
		item.incrementQuantity(1)

		expect(item.getQuantity()).toBe(2)
	})

	it('Increment ten', () => {
		item.incrementQuantity(10)

		expect(item.getQuantity()).toBe(12)
	})

	it('Checking value on overflow', () => {
		function increment() {
			item.incrementQuantity(999)
		}

		expect(increment).toThrow()
	})
})

describe('Check decrement functions', () => {
	const itemManager = new ItemsManager()
	const item = new PlayerInventoryItem({
		item: itemManager.create(1),
		quantity: 10
	})

	it('Decrement one', () => {
		item.decrementQuantity(1)

		expect(item.getQuantity()).toBe(9)
	})

	it('Decrement seven', () => {
		item.decrementQuantity(7)

		expect(item.getQuantity()).toBe(2)
	})

	it('Checking value on below zero', () => {
		function increment() {
			item.decrementQuantity(3)
		}

		expect(increment).toThrow()
	})
})