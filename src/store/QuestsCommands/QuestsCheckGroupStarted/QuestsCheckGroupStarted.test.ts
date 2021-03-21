import PlayerLevel from "../../PlayerLevel"
import PlayerInventory from "../../PlayerInventory"
import QuestsFactory from "../../QuestsFactory"
import {QuestsCheckGroupStarted} from "./QuestsCheckGroupStarted"
import QuestsCommander from "../../QuestsCommander"

const groupName = 'QUEST_GROUP_INVENTORY_TUTORIAL'

it('Checking check function', () => {
	const questsFactory = new QuestsFactory()

	const questsCommander = new QuestsCommander({
		level: new PlayerLevel(1, 0),
		inventory: new PlayerInventory(),
		questsFactory
	})

	questsFactory.setCommander(questsCommander)
	questsFactory.init()

	const command = new QuestsCheckGroupStarted({
		questsFactory
	})

	expect(command.check(groupName)).toBeFalsy()

	questsFactory.getGroup(groupName).toActivate()

	expect(command.check(groupName)).toBeTruthy()
})
