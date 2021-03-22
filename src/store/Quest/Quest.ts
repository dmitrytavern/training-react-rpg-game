import { makeAutoObservable } from "mobx"
import QuestsCommander from "../QuestsCommander"
import QuestsRequirements from "../QuestsRequirements"

interface QuestAction {
	action: string
	payload: any
}

interface QuestMeta {
	title: string
	description: string
}

export interface QuestPropsData {
	group: string
	name: string
	next: string | null
	meta: QuestMeta
	requirements: QuestAction[]
	completionRequirements: QuestAction[]
	rewards: QuestAction[]
}

export interface QuestProps {
	data: QuestPropsData
	questsCommander: QuestsCommander
}

class Quest {
	public readonly group: string
	public readonly name: string
	public readonly next: string | null
	public readonly meta: QuestMeta
	public readonly requirements: QuestsRequirements
	public readonly completionRequirements: QuestsRequirements
	public readonly rewards: QuestAction[]

	private readonly commands: QuestsCommander
	private completed: boolean
	private active: boolean

	constructor(props: QuestProps) {
		const { data, questsCommander } = props
		this.commands = questsCommander

		this.group = data.group
		this.name = data.name
		this.next = data.next
		this.meta = data.meta

		this.requirements = new QuestsRequirements({
			requirements: data.requirements,
			questsCommander: this.commands
		})

		this.completionRequirements = new QuestsRequirements({
			requirements: data.completionRequirements,
			questsCommander: this.commands
		})

		this.rewards = data.rewards

		this.completed = false
		this.active = false

		this.requirements.subscribe()
		makeAutoObservable(this)
	}

	public isCompleted(): boolean {
		return this.completed
	}

	public isActive(): boolean {
		return this.active
	}

	public toActivate() {
		if (this.isActive()) {
			throw new Error('Quest already activated: '+this.name)
		}

		if (!this.requirements.check()) {
			throw new Error('Cannot activate quest: '+this.name)
		}

		this.active = true
		this.requirements.unsubscribe()
		this.completionRequirements.subscribe()
	}

	public toFinish() {
		if (this.isCompleted()) {
			throw new Error('Quest already finished: '+this.name)
		}

		if (!this.completionRequirements.check()) {
			throw new Error('Cannot activate quest: '+this.name)
		}

		this.completed = true
		this.active = false
		this.completionRequirements.unsubscribe()
		this._getRewards()
	}

	private _getRewards() {
		for (let {action, payload} of this.rewards) {
			this.commands.action(action, payload)
		}
	}
}

export default Quest
