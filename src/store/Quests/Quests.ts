import QuestsFactory from "../QuestsFactory"
import QuestsCommander from "../QuestsCommander"
import QuestsGroup from "../QuestsGroup"
import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"


interface QuestsProps {
	playerLevel: PlayerLevel
	playerInventory: PlayerInventory
}

class Quests {
	private readonly questsFactory: QuestsFactory

	constructor(props: QuestsProps) {
		const questsCommander = new QuestsCommander({
			level: props.playerLevel,
			inventory: props.playerInventory,
		})

		this.questsFactory = new QuestsFactory(questsCommander)
	}

	public getQuestGroup(name: string) {
		return this.questsFactory.getGroup(name)
	}

	public getActiveQuestGroups(): QuestsGroup[] {
		return this.questsFactory.getActiveGroups()
	}

	public getCompletedQuestGroups(): QuestsGroup[] {
		return this.questsFactory.getCompletedGroups()
	}

	public toActivateQuestGroup(name: string) {
		const group = this.questsFactory.getGroup(name)

		if (!group.checkRequirements()) {
			throw new Error('Quest cannot be activated: '+name)
		}

		group.toActivate()
	}

	public toFinishQuest(name: string) {
		const quest = this.questsFactory.getQuest(name)

		if (!quest.checkCompletionRequirements()) {
			throw new Error('Quest cannot be finished: '+name)
		}

		quest.toFinish()

		if (quest.next) {
			this.questsFactory.getQuest(quest.next).toActivate()
		} else {
			this.questsFactory.getGroup(quest.group).toFinish()
		}
	}
}

export default Quests
