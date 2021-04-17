import Quest from "./Quest"

import data from '../QuestsFactory/data'

const questData = {
	...data[0].quests[0],
	requirements: []
}

it('Checking base properties', () => {
	const quest = new Quest(questData)

	expect(quest.getStatus() === 'unlocked').toBeTruthy()
	expect(quest.getStatus() === 'active').toBeFalsy()
	expect(quest.getStatus() === 'completed').toBeFalsy()
	expect(quest.getStatus() === 'done').toBeFalsy()
})

it('Checking toActivate function', () => {
	const quest = new Quest(questData)

	expect(quest.getStatus() === 'active').toBeFalsy()

	quest.toActivate()

	expect(quest.getStatus() === 'active').toBeTruthy()
})

it('Checking toComplete function', () => {
	const quest = new Quest(questData)

	expect(quest.getStatus() === 'completed').toBeFalsy()

	quest.toComplete()

	expect(quest.getStatus() === 'completed').toBeTruthy()
})

it('Checking toDo function', () => {
	const quest = new Quest(questData)

	expect(quest.getStatus() === 'done').toBeFalsy()

	quest.toDo()

	expect(quest.getStatus() === 'done').toBeTruthy()
})