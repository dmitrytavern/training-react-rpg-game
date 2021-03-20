import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import QuestsCommander from "../QuestsCommander"
import Quest from "./Quest"

import data from "../Quests/data"

const inventory = new PlayerInventory()
const level = new PlayerLevel(1, 0)
const questsCommander = new QuestsCommander({
	inventory,
	level
})

it('Checking base properties', () => {
	const quest = new Quest({questsCommander, data: data[0]})

	expect(quest.isActive()).toBeFalsy()
	expect(quest.isCompleted()).toBeFalsy()
	expect(quest.canBeFinished()).toBeFalsy()
	expect(quest.canBeActivate()).toBeTruthy()
})

it('Checking toActivate function', () => {
	const quest = new Quest({questsCommander, data: data[0]})

	expect(quest.canBeActivate()).toBeTruthy()

	quest.toActivate()

	expect(quest.canBeActivate()).toBeFalsy()
})

it('Checking toFinish function', () => {
	const quest = new Quest({questsCommander, data: data[0]})

	expect(() => quest.toFinish()).toThrow()

	quest.toActivate()

	expect(() => quest.toFinish()).toThrow()

	inventory.addItem(1, 1)

	for (let step of quest.steps) {
		step.toActivate()
		step.toFinish()
	}

	expect(quest.canBeFinished()).toBeTruthy()

	quest.toFinish()

	expect(quest.isActive()).toBeFalsy()
	expect(quest.isCompleted()).toBeTruthy()
	expect(quest.canBeFinished()).toBeFalsy()
	expect(quest.canBeActivate()).toBeFalsy()
})