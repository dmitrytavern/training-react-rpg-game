import data from "./data"
import ItemsManager from "./ItemsManager"

describe('Check create functions' , () => {
	const itemManager = new ItemsManager()

	it('Create exists item', () => {
		const item = itemManager.create(1)

		const itemData = data.find((x) => x.id === 1)

		expect(item).toEqual(itemData)
	})

	it('Create not exists item', () => {
		function create() {
			itemManager.create(99999)
		}

		expect(create).toThrow()
	})
})