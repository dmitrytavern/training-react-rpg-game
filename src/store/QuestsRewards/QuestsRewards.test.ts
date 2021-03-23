import PlayerInventory from "../PlayerInventory"
import QuestsCommander from "../QuestsCommander"
import QuestsRewards from "./QuestsRewards"

it('Checking getRewards function', () => {
	const inventory = new PlayerInventory()
	const commander = new QuestsCommander({inventory})
	const questsRewards = new QuestsRewards(commander)

	questsRewards.getRewards([
		{action: 'inventory:add_item', payload: {itemId: 1, quantity: 1}}
	])

	expect(inventory.existsItem(1)).toBeTruthy()
})