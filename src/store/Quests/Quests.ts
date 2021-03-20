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

	public getActiveQuest() {

	}

	public startQuest() {

	}

	public completeQuests() {

	}
}

export default Quests
