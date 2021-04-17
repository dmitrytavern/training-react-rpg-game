import { makeAutoObservable } from "mobx"
import {
	QuestStatus,
	QuestAction,
	QuestMeta,
	QuestProps
} from './types'

class Quest {
	public readonly id: number
	public readonly meta: QuestMeta
	public readonly requirements: QuestAction[]
	public readonly completionRequirements: QuestAction[]
	public readonly rewards: QuestAction[]

	private status: QuestStatus

	constructor(data: QuestProps) {
		this.id = data.id
		this.meta = data.meta
		this.rewards = data.rewards
		this.status = "unlocked"

		this.requirements = data.requirements
		this.completionRequirements = data.completionRequirements

		makeAutoObservable(this)
	}

	public getStatus(): QuestStatus {
		return this.status
	}

	public toActivate() {
		if (this.getStatus() === 'active') {
			throw new Error('Quest already activated: '+this.id)
		}

		this.status = 'active'
	}

	public toComplete() {
		if (this.getStatus() === 'completed') {
			throw new Error('Quest already completed: '+this.id)
		}

		this.status = 'completed'
	}

	public toDo() {
		if (this.getStatus() === 'done') {
			throw new Error('Quest already done: '+this.id)
		}

		this.status = 'done'
	}
}

export default Quest
