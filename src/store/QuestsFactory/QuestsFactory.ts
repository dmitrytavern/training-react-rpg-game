import data from "./data"
import Quest, {QuestProps} from "../Quest"
import QuestsGroup from "../QuestsGroup"

class QuestsFactory {
	private groups: QuestsGroup[]

	constructor() {
		this.groups = QuestsFactory.initQuestGroups()
	}

	public getGroup(id: number): QuestsGroup {
		const group = this.groups.find((group) => group.id === id)
		if (!group) {
			throw new Error('Quest group not found: '+id)
		}
		return group
	}

	public getActiveGroups(): QuestsGroup[] {
		return this.groups.filter((group) => group.getStatus() === 'active')
	}

	public getCompletedGroups(): QuestsGroup[] {
		return this.groups.filter((group) => group.getStatus() === 'completed')
	}

	public getDoneGroups(): QuestsGroup[] {
		return this.groups.filter((group) => group.getStatus() === 'done')
	}

	public getQuest(groupId: number, questId: number): Quest {
		const group = this.getGroup(groupId)
		const quest = group.quests.find((quest) => quest.id === questId)

		if (!quest) {
			throw new Error('Quest not found!')
		}

		return quest
	}

	public existsQuest(groupId: number, questId: number): boolean {
		const group = this.getGroup(groupId)
		return !!group.quests.find((quest) => quest.id === questId)
	}


	private static initQuestGroups(): QuestsGroup[] {
		const arr = []
		for (let groupData of data) {
			const quests = QuestsFactory.initQuests(groupData.quests)
			const group = new QuestsGroup({...groupData, quests})
			arr.push(group)
		}
		return arr
	}

	private static initQuests(quests: QuestProps[]): Quest[] {
		const arr = []
		for (let questData of quests) {
			const quest = new Quest(questData)
			arr.push(quest)
		}
		return arr
	}
}

export default QuestsFactory
