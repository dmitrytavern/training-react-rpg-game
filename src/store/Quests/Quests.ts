import Quest from "../Quest"
import QuestsCommander from "../QuestsCommander"
import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"

import data from "./data"

interface QuestsProps {
	playerLevel: PlayerLevel
	playerInventory: PlayerInventory
}

class Quests {
	private readonly questsCommander: QuestsCommander
	private readonly quests: Quest[]

	constructor(props: QuestsProps) {
		this.questsCommander = new QuestsCommander({
			level: props.playerLevel,
			inventory: props.playerInventory
		})

		this.quests = this.initQuests()
	}

	private initQuests(): Quest[] {
		const arr = []
		for (let questData of data) {
			const quest = new Quest({
				data: questData,
				questsCommander: this.questsCommander
			})
			arr.push(quest)
		}
		return arr
	}

	public getQuest(questId: number): Quest {
		const quest = this.quests.find((quest) => quest.id === questId)
		if (!quest) throw new Error('Quest not found! Id: '+questId)
		return quest
	}

	public getActiveQuests(): Quest[] {
		return this.quests.filter((quest) => quest.isActive())
	}

	public getFinishedQuests(): Quest[] {
		return this.quests.filter((quest) => quest.isCompleted())
	}

	public toActivateQuest(questId: number) {
		const quest = this.quests.find((quest) => quest.id === questId)

		if (quest === undefined) {
			throw new Error('Quest not found: '+questId)
		}

		if (!quest.canBeActivate()) {
			throw new Error('Quest cannot be activated: '+questId)
		}

		quest.toActivate()
	}
}

export default Quests
