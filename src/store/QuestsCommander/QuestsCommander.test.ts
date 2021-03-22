import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import QuestsCommander from "./QuestsCommander"

it('Checking action function', () => {
	const level = new PlayerLevel(1, 0)
	const commander = new QuestsCommander({level})

	commander.action('level:add_experience', 50)

	expect(() => commander.action('undefined')).toThrow()
})

it('Checking subscribe function', () => {
	const inventory = new PlayerInventory()
	const commander = new QuestsCommander({inventory})
	const data = {itemId: 1, quantity: 1}

	commander.subscribe('inventory:check_item', data, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})

	expect(() => commander.subscribe('undefined', data, () => {})).toThrow()
})

it('Checking subscribe function with default value', () => {
	const inventory = new PlayerInventory()
	const commander = new QuestsCommander({inventory})
	const data = {itemId: 1, quantity: 1}

	inventory.addItem(1, 1)

	commander.subscribe('inventory:check_item', data, (value: boolean, disposer: Function) => {
		expect(value).toBeTruthy()
		disposer()
	})
})