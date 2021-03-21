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
		const questsFactory = new QuestsFactory()

		const questsCommander = new QuestsCommander({
			level: props.playerLevel,
			inventory: props.playerInventory,
			questsFactory
		})

		questsFactory.setCommander(questsCommander)
		questsFactory.init()

		this.questsFactory = questsFactory
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
}

export default Quests
