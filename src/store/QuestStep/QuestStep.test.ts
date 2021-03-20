import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import QuestsCommander from "../QuestsCommander"
import QuestStep from "./QuestStep"

const inventory = new PlayerInventory()
const level = new PlayerLevel(1, 0)
const questsCommander = new QuestsCommander({
	inventory,
	level
})

const data = {
	name: "QUEST_ACT1_INVENTORY_TUTORIAL:STEP1",
	title: 'Get sword',
	description: 'Check',
	rewards: null,
	requirements: [
		{
			action: 'inventory:check_item',
			payload: { itemId: 1, quantity: 1}
		}
	]
}

const dataWithRewards = {
	name: "QUEST_ACT1_INVENTORY_TUTORIAL:STEP2",
	title: 'Cool player!',
	description: 'Get your rewards',
	rewards: [
		{
			action: 'inventory:add_item',
			payload: { itemId: 1, quantity: 1}
		},
		{
			action: 'level:add_experience',
			payload: 40
		}
	],
	requirements: null
}

describe('Checking step without reward and with requirements', () => {
	it('Checking base properties', () => {
		const step = new QuestStep({questsCommander, data})

		expect(step.isActive()).toBeFalsy()
		expect(step.isCompleted()).toBeFalsy()
		expect(step.canBeActivate()).toBeTruthy()
		expect(step.canBeFinished()).toBeFalsy()
	})

	it('Checking toActive function', () => {
		const step = new QuestStep({questsCommander, data})

		expect(step.canBeActivate()).toBeTruthy()

		step.toActivate()

		expect(step.canBeActivate()).toBeFalsy()
	})

	it('Checking toFinish function', () => {
		const step = new QuestStep({questsCommander, data})

		expect(() => step.toFinish()).toThrow()

		step.toActivate()

		inventory.addItem(1, 1)

		step.toFinish()

		expect(step.isActive()).toBeFalsy()
		expect(step.isCompleted()).toBeTruthy()
		expect(step.canBeFinished()).toBeFalsy()
		expect(step.canBeActivate()).toBeFalsy()

		inventory.removeItem(1, 1)
	})
})

describe('Checking step with reward and without requirements', () => {
	it('Checking base properties', () => {
		const step = new QuestStep({questsCommander, data: dataWithRewards})

		expect(step.isActive()).toBeFalsy()
		expect(step.isCompleted()).toBeFalsy()
		expect(step.canBeActivate()).toBeTruthy()
		expect(step.canBeFinished()).toBeFalsy()
	})

	it('Checking toFinish function', () => {
		const step = new QuestStep({questsCommander, data: dataWithRewards})

		expect(step.canBeFinished()).toBeFalsy()

		step.toActivate()

		expect(step.isActive()).toBeTruthy()
		expect(step.isCompleted()).toBeFalsy()
		expect(step.canBeActivate()).toBeFalsy()
		expect(step.canBeFinished()).toBeTruthy()

		step.toFinish()

		expect(step.isActive()).toBeFalsy()
		expect(step.isCompleted()).toBeTruthy()
		expect(step.canBeActivate()).toBeFalsy()
		expect(step.canBeFinished()).toBeFalsy()

		expect(inventory.existsItem(1, 1)).toBeTruthy()
		expect(level.getExperience()).toBe(40)
	})
})