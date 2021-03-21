import QuestsCheckCommand from "../../QuestsCheckCommand"
import QuestsFactory from "../../QuestsFactory"

interface CommandProps {
	questsFactory?: QuestsFactory
}

export class QuestsCheckQuestCompleted extends QuestsCheckCommand {
	private readonly questsFactory: QuestsFactory | undefined

	constructor(global: CommandProps) {
		super()

		if (!global.questsFactory) {
			console.warn('QuestsFactory is undefined')
		}

		this.questsFactory = global.questsFactory
	}

	public check(payload: string) {
		if (!this.questsFactory) {
			throw new Error('QuestsFactory is undefined')
		}

		return this.questsFactory.getQuest(payload).isCompleted()
	}
}
