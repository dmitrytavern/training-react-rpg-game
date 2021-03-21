import {makeAutoObservable} from "mobx"
import QuestsCommander from "../QuestsCommander"

interface StepRequirements {
	readonly action: string,
	readonly payload: any
}

export interface StepReward {
	readonly action: string,
	readonly payload: any
}

export interface StepPropsData {
	name: string
	title: string
	description: string
	requirements: StepRequirements[] | null
	rewards: StepReward[] | null
}

export interface StepProps {
	data: StepPropsData
	questsCommander: QuestsCommander
}

class QuestStep {
	public readonly name: string
	public readonly title: string
	public readonly description: string
	public readonly requirements: StepRequirements[] | null
	public readonly rewards: StepReward[] | null

	private readonly questsCommander: QuestsCommander
	private completed: boolean
	private active: boolean

	constructor(props: StepProps) {
		this.questsCommander = props.questsCommander

		this.name = props.data.name
		this.title = props.data.title
		this.description = props.data.description
		this.requirements = props.data.requirements
		this.rewards = props.data.rewards

		this.completed = false
		this.active = false

		makeAutoObservable(this)
	}

	public isCompleted(): boolean {
		return this.completed
	}

	public isActive(): boolean {
		return this.active
	}

	public canBeActivate(): boolean {
		return !this.completed && !this.active
	}

	public canBeFinished(): boolean {
		let bool = true

		if (this.isCompleted() || !this.isActive()) return false

		if (this.requirements) {
			for (let {action, payload} of this.requirements) {
				const res = this.questsCommander.check(action, payload)
				if (!res) bool = false
			}
		}

		return bool
	}

	public toActivate() {
		if (!this.canBeActivate()) {
			throw new Error('Cannot activate step: '+this.name)
		}

		this.active = true
	}

	public toFinish() {
		if (!this.canBeFinished()) {
			throw new Error('Cannot finish step: '+this.name)
		}

		this.completed = true
		this.active = false

		if (this.rewards) {
			for (let {action, payload} of this.rewards) {
				this.questsCommander.action(action, payload)
			}
		}
	}
}

export default QuestStep
