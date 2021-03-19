import QuestsCommander from "../QuestsCommander"
import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"

interface QuestsProps {
	playerLevel: PlayerLevel
	playerInventory: PlayerInventory
}

class Quests {
	constructor(props: QuestsProps) {
		const questsCommander = new QuestsCommander({
			level: props.playerLevel,
			inventory: props.playerInventory
		})
	}

	public getActiveQuest() {

	}

	public startQuest() {

	}

	public completeQuests() {

	}
}

export default Quests
