import PlayerLevel from "../../PlayerLevel"
import PlayerInventory from "../../PlayerInventory"
import QuestsFactory from "../../QuestsFactory"
import {QuestsCheckQuestCompleted} from "./QuestsCheckQuestCompleted"
import QuestsCommander from "../../QuestsCommander";

const groupName = 'QUEST_GROUP_INVENTORY_TUTORIAL'
const questName = 'QUEST_GROUP_INVENTORY_TUTORIAL:QUEST1'

it('Checking check function', () => {
	const questsFactory = new QuestsFactory()
	const inventory = new PlayerInventory()
	const questsCommander = new QuestsCommander({
		level: new PlayerLevel(1, 0),
		inventory,
		questsFactory
	})

	questsFactory.setCommander(questsCommander)
	questsFactory.init()

	const command = new QuestsCheckQuestCompleted({
		questsFactory
	})

	expect(command.check(questName)).toBeFalsy()

	questsFactory.getGroup(groupName).toActivate()
	inventory.addItem(1, 1)
	questsFactory.getQuest(questName).toFinish()

	expect(command.check(questName)).toBeTruthy()
})
