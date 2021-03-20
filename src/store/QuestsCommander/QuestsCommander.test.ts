import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import QuestsCommander from "./QuestsCommander"

const inventory = new PlayerInventory()
const level = new PlayerLevel(1, 0)

it('Checking action function', () => {
	const commander = new QuestsCommander({inventory, level})

	commander.action('level:add_experience', 50)

	expect(() => commander.action('undefined')).toThrow()
})

it('Checking checker function', () => {
	const commander = new QuestsCommander({inventory, level})

	expect(
		commander.check('inventory:check_item', {itemId: 1, quantity: 1})
	).toBeFalsy()

	expect(() => commander.check('undefined')).toThrow()
})