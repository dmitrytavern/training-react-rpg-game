import ItemsFactory from "../ItemsFactory"
import PlayerInventoryItem from "./PlayerInventoryItem"

describe('Check default properties', () => {
	const itemsFactory = new ItemsFactory()
	const item = new PlayerInventoryItem({
		item: itemsFactory.create(1),
		quantity: 1
	})

	it('Check quantity', () => {
		expect(item.getQuantity()).toBe(1)
	})
})

describe('Check increment functions', () => {
	const itemsFactory = new ItemsFactory()
	const item = new PlayerInventoryItem({
		item: itemsFactory.create(1),
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
	const itemsFactory = new ItemsFactory()
	const item = new PlayerInventoryItem({
		item: itemsFactory.create(1),
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