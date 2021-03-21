import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import QuestsCommander from "../QuestsCommander"
import Quest from "./Quest"

import * as data from '../QuestsFactory/data'

const inventory = new PlayerInventory()
const level = new PlayerLevel(1, 0)
const questsCommander = new QuestsCommander({
	inventory,
	level
})

const questData = {
	...data.quests[0],
	requirements: []
}

it('Checking base properties', () => {
	const quest = new Quest({questsCommander, data: questData})

	expect(quest.isActive()).toBeFalsy()
	expect(quest.isCompleted()).toBeFalsy()
	expect(quest.checkRequirements()).toBeTruthy()
	expect(quest.checkCompletionRequirements()).toBeFalsy()
})

it('Checking toActivate function', () => {
	const quest = new Quest({questsCommander, data: questData})

	expect(quest.isActive()).toBeFalsy()

	quest.toActivate()

	expect(quest.isActive()).toBeTruthy()
})

it('Checking toFinish function', () => {
	const quest = new Quest({questsCommander, data: questData})

	expect(() => quest.toFinish()).toThrow()

	quest.toActivate()

	expect(() => quest.toFinish()).toThrow()

	inventory.addItem(1, 1)

	quest.toFinish()

	expect(quest.isActive()).toBeFalsy()
	expect(quest.isCompleted()).toBeTruthy()
})