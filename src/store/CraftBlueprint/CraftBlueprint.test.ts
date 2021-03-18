import ItemsFactory from "../ItemsFactory"
import PlayerInventory from "../PlayerInventory"
import CraftMaterialFactory from "../CraftMaterialFactory"
import CraftToolFactory from "../CraftToolFactory"
import CraftBlueprint from "./CraftBlueprint"

const itemsFactory = new ItemsFactory()

const testData = {
	id: 1,
	category: 'smithing',
	materials: [
		{id: 101, quantity: 1},
		{id: 102, quantity: 1}
	],
	tools: [],
	result: { id: 1, quantity: 1 }
}

const testDataWithTools = {
	id: 1,
	category: 'smithing',
	materials: [
		{id: 101, quantity: 1},
		{id: 102, quantity: 1}
	],
	tools: [{id: 301}],
	result: { id: 1, quantity: 1 }
}

it('Check available when materials not available', () => {
	const inventory = new PlayerInventory()
	const materialFactory = new CraftMaterialFactory(inventory)
	const toolFactory = new CraftToolFactory(inventory)
	const blueprint = new CraftBlueprint({
		materialFactory,
		toolFactory,
		item: testData
	})

	expect(blueprint.isAvailable()).toBeFalsy()
})

it('Check available when one material not available', () => {
	const inventory = new PlayerInventory()
	const materialFactory = new CraftMaterialFactory(inventory)
	const toolFactory = new CraftToolFactory(inventory)
	const blueprint = new CraftBlueprint({
		materialFactory,
		toolFactory,
		item: testData
	})

	inventory.addItem(itemsFactory.create(101), 1)

	expect(blueprint.isAvailable()).toBeFalsy()
})

it('Check available when materials is available', () => {
	const inventory = new PlayerInventory()
	const materialFactory = new CraftMaterialFactory(inventory)
	const toolFactory = new CraftToolFactory(inventory)
	const blueprint = new CraftBlueprint({
		materialFactory,
		toolFactory,
		item: testData
	})

	inventory.addItem(itemsFactory.create(101), 1)
	inventory.addItem(itemsFactory.create(102), 1)

	expect(blueprint.isAvailable()).toBeTruthy()
})

it('Check available without tool', () => {
	const inventory = new PlayerInventory()
	const materialFactory = new CraftMaterialFactory(inventory)
	const toolFactory = new CraftToolFactory(inventory)
	const blueprint = new CraftBlueprint({
		materialFactory,
		toolFactory,
		item: testDataWithTools
	})

	inventory.addItem(itemsFactory.create(101), 1)
	inventory.addItem(itemsFactory.create(102), 1)

	expect(blueprint.isAvailable()).toBeFalsy()
})

it('Check available with tool', () => {
	const inventory = new PlayerInventory()
	const materialFactory = new CraftMaterialFactory(inventory)
	const toolFactory = new CraftToolFactory(inventory)
	const blueprint = new CraftBlueprint({
		materialFactory,
		toolFactory,
		item: testDataWithTools
	})

	inventory.addItem(itemsFactory.create(101), 1)
	inventory.addItem(itemsFactory.create(102), 1)
	inventory.addItem(itemsFactory.create(301), 1)

	expect(blueprint.isAvailable()).toBeTruthy()
})