import { makeAutoObservable } from "mobx"
import QuestsCommander from "../QuestsCommander"

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
	public readonly requirements: QuestAction[]
	public readonly completionRequirements: QuestAction[]
	public readonly rewards: QuestAction[]

	private commands: QuestsCommander
	private completed: boolean
	private active: boolean

	constructor(props: QuestProps) {
		const { data, questsCommander } = props

		this.group = data.group
		this.name = data.name
		this.next = data.next
		this.meta = data.meta
		this.requirements = data.requirements
		this.completionRequirements = data.completionRequirements
		this.rewards = data.rewards

		this.completed = false
		this.active = false

		this.commands = questsCommander

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

		if (!this.checkRequirements()) {
			throw new Error('Cannot activate quest: '+this.name)
		}

		this.active = true
	}

	public toFinish() {
		if (this.isCompleted()) {
			throw new Error('Quest already finished: '+this.name)
		}

		if (!this.checkCompletionRequirements()) {
			throw new Error('Cannot activate quest: '+this.name)
		}

		this.completed = true
		this.active = false
		this._getRewards()
	}

	public checkRequirements(): boolean {
		return this._checkRequirements(this.requirements)
	}

	public checkCompletionRequirements(): boolean {
		return this._checkRequirements(this.completionRequirements)
	}


	private _getRewards() {
		for (let {action, payload} of this.rewards) {
			this.commands.action(action, payload)
		}
	}

	private _checkRequirements(requirements: QuestAction[]) {
		for (const {action, payload} of requirements) {
			const result = this.commands.check(action, payload)
			if (!result) return false
		}

		return true
	}
}

export default Quest
