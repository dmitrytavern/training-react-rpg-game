import * as data from "./data"
import Quest from "../Quest"
import QuestsGroup from "../QuestsGroup"
import QuestsCommander from "../QuestsCommander"

const ERROR_QUESTS_COMMANDER = 'Quests commander not defined'

class QuestsFactory {
	private questsCommander: QuestsCommander | undefined
	private groups: QuestsGroup[]
	private quests: Quest[]

	constructor() {
		this.quests = []
		this.groups = []
	}

	public setCommander(questsCommander: QuestsCommander) {
		this.questsCommander = questsCommander
	}

	public init() {
		this.quests = this.initQuests()
		this.groups = this.initQuestGroups()
	}

	private initQuests(): Quest[] {
		if (!this.questsCommander) throw new Error(ERROR_QUESTS_COMMANDER)

		const arr = []
		for (let questData of data.quests) {
			const quest = new Quest({
				data: questData,
				questsCommander: this.questsCommander
			})
			arr.push(quest)
		}
		return arr
	}

	private initQuestGroups(): QuestsGroup[] {
		if (!this.questsCommander) throw new Error(ERROR_QUESTS_COMMANDER)

		const arr = []
		for (let groupData of data.groups) {
			const quests = groupData.quests.map((name) => this.getQuest(name))

			const group = new QuestsGroup({
				data: {
					...groupData,
					quests
				},
				questsCommander: this.questsCommander
			})
			arr.push(group)
		}
		return arr
	}


	public getQuest(name: string): Quest {
		const quest = this.quests.find((quest) => quest.name === name)
		if (!quest) {
			throw new Error('Quest group not found: '+name)
		}
		return quest
	}

	public getGroup(name: string): QuestsGroup {
		const group = this.groups.find((group) => group.name === name)
		if (!group) {
			throw new Error('Quest group not found: '+name)
		}
		return group
	}

	public getActiveGroups(): QuestsGroup[] {
		return this.groups.filter((group) => group.isActive())
	}

	public getCompletedGroups(): QuestsGroup[] {
		return this.groups.filter((group) => group.isCompleted())
	}
}

export default QuestsFactory
