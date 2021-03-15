import ItemsFactory from "./ItemsFactory"
import data from "./data"

describe('Check create functions' , () => {
	const itemsFactory = new ItemsFactory()

	it('Create exists item', () => {
		const item = itemsFactory.create(1)

		const itemData = data.find((x) => x.id === 1)

		expect(item).toEqual(itemData)
	})

	it('Create not exists item', () => {
		function create() {
			itemsFactory.create(99999)
		}

		expect(create).toThrow()
	})

	it('Create not exists item with other type', () => {
		function create() {
			itemsFactory.create(1, 'trash')
		}

		expect(create).toThrow()
	})
})