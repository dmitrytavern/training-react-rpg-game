import QuestsCommander from "../QuestsCommander"

interface QuestAction {
	action: string
	payload: any
}

class QuestsRewards {
	private readonly commands: QuestsCommander

	constructor(questsCommander: QuestsCommander) {
		this.commands = questsCommander
	}

	public getRewards(rewards: QuestAction[]) {
		for (let {action, payload} of rewards) {
			this.commands.action(action, payload)
		}
	}
}

export default QuestsRewards
