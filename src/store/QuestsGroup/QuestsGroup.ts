import Quest from "../Quest"
import QuestsCommander from "../QuestsCommander"

interface QuestsGroupAction {
	action: string
	payload: any
}

interface QuestsGroupMeta {
	title: string,
	description: string
}

export interface QuestsGroupData {
	name: string,
	meta: QuestsGroupMeta,
	requirements: QuestsGroupAction[]
	quests: Quest[]
}

export interface QuestsGroupProps {
	data: QuestsGroupData
	questsCommander: QuestsCommander
}

class QuestsGroup {
	public readonly name: string
	public readonly meta: QuestsGroupMeta
	public readonly requirements: QuestsGroupAction[]
	private readonly quests: Quest[]

	private readonly commands: QuestsCommander
	private completed: boolean
	private active: boolean

	constructor(props: QuestsGroupProps) {
		const { data, questsCommander } = props

		this.name = data.name
		this.meta = data.meta
		this.quests = data.quests
		this.requirements = data.requirements

		this.completed = false
		this.active = false

		this.commands = questsCommander
	}

	public isCompleted(): boolean {
		return this.completed
	}

	public isActive(): boolean {
		return this.active
	}

	public toActivate() {
		if (!this.checkRequirements()) {
			throw new Error('Cannot activate group: '+this.name)
		}

		this.active = true
		this.quests[0].toActivate()
	}

	public toFinish() {
		if (!this.checkQuestsCompletion()) {
			throw new Error('Cannot finish group: '+this.name)
		}

		this.completed = true
		this.active = false
	}

	public checkRequirements(): boolean {
		for (const {action, payload} of this.requirements) {
			const result = this.commands.check(action, payload)
			if (!result) return false
		}

		return true
	}

	public checkQuestsCompletion(): boolean {
		for (const quest of this.quests) {
			if (!quest.isCompleted()) return false
		}

		return true
	}
}

export default QuestsGroup
