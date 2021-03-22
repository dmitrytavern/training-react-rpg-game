import PlayerInventory from "../PlayerInventory"
import QuestsCommander from "../QuestsCommander"
import QuestsRequirements from "./QuestsRequirements"

describe('Checking check function', () => {
	const inventory = new PlayerInventory()
	const commander = new QuestsCommander({inventory})

	const questRequirements = new QuestsRequirements({
		questsCommander: commander,
		requirements: [
			{action: 'inventory:check_item', payload: {itemId: 1, quantity: 1}}
		]
	})

	questRequirements.subscribe()

	it('Check isSubscribe', () => {
		expect(questRequirements.isSubscribed()).toBeTruthy()
	})

	it('Check without item', () => {
		expect(questRequirements.check()).toBeFalsy()
	})

	it('Check with item', () => {
		inventory.addItem(1, 1)
		expect(questRequirements.check()).toBeTruthy()
	})
})

describe('Checking subscribe/unsubscribe', () => {
	const inventory = new PlayerInventory()
	const commander = new QuestsCommander({inventory})

	const questRequirements = new QuestsRequirements({
		questsCommander: commander,
		requirements: [
			{action: 'inventory:check_item', payload: {itemId: 1, quantity: 1}}
		]
	})

	it('Subscribe', () => {
		expect(questRequirements.isSubscribed()).toBeFalsy()

		questRequirements.subscribe()

		expect(questRequirements.isSubscribed()).toBeTruthy()
	})

	it('Subscribe again', () => {
		expect(() => questRequirements.subscribe()).toThrow()
	})

	it('Unsubscribe', () => {
		questRequirements.unsubscribe()

		expect(questRequirements.isSubscribed()).toBeFalsy()
	})

	it('Checking check function', () => {
		expect(questRequirements.check()).toBeFalsy()

		inventory.addItem(1, 1)

		expect(questRequirements.check()).toBeFalsy()
	})

	it('Unsubscribe again', () => {
		expect(() => questRequirements.unsubscribe()).toThrow()
	})
})