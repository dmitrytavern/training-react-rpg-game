import QuestsFactory from "../QuestsFactory"
import QuestsCommander from "../QuestsCommander"
import QuestsRequirements from "../QuestsRequirements"
import QuestsRewards from "../QuestsRewards"
import QuestsGroup from "../QuestsGroup"
import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import PlayerBalance from "../PlayerBalance"

interface QuestsProps {
	playerLevel: PlayerLevel
	playerInventory: PlayerInventory
	playerBalance: PlayerBalance
}

class Quests {
	private readonly questsFactory: QuestsFactory
	private readonly questsRequirements: QuestsRequirements
	private readonly questsRewards: QuestsRewards

	constructor(props: QuestsProps) {
		const questsCommander = new QuestsCommander({
			level: props.playerLevel,
			inventory: props.playerInventory,
			balance: props.playerBalance,
		})

		this.questsFactory = new QuestsFactory()
		this.questsRequirements = new QuestsRequirements(questsCommander)
		this.questsRewards = new QuestsRewards(questsCommander)
	}

	public getQuestGroup(id: number) {
		return this.questsFactory.getGroup(id)
	}

	public getActiveQuestGroups(): QuestsGroup[] {
		return this.questsFactory.getActiveGroups()
	}

	public getCompletedQuestGroups(): QuestsGroup[] {
		return this.questsFactory.getCompletedGroups()
	}

	public getDoneQuestGroups(): QuestsGroup[] {
		return this.questsFactory.getDoneGroups()
	}

	public checkQuestGroup(id: number): boolean {
		const quest = this.questsFactory.getQuest(id, 1)
		return this.questsRequirements.checkRequirements(quest.requirements)
	}


	public toActivateQuest(groupId: number, questId: number) {
		const quest = this.questsFactory.getQuest(groupId, questId)

		quest.toActivate()

		const _id = `${groupId}:${quest.id}`
		const _req = quest.completionRequirements
		this.questsRequirements.subscribe(_id, _req, (value: boolean) => {
			if (value) {
				quest.toComplete()
			} else {
				if (quest.getStatus() !== 'active') quest.toActivate()
			}
		})
	}

	public toDoQuest(groupId: number, questId: number) {
		const quest = this.questsFactory.getQuest(groupId, questId)
		const nextQuestExists = this.questsFactory.existsQuest(groupId, questId + 1)

		quest.toDo()

		const _id = `${groupId}:${quest.id}`
		this.questsRequirements.unsubscribe(_id)
		this.questsRewards.getRewards(quest.rewards)

		if (nextQuestExists) {
			this.toActivateQuest(groupId, questId + 1)
		}
	}
}

export default Quests
