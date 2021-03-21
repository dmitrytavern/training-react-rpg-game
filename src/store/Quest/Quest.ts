import { makeAutoObservable } from "mobx"
import { StepPropsData } from "../QuestStep"
import QuestsCommander from "../QuestsCommander"
import QuestSteps from "../QuestSteps"

export interface QuestPropsData {
	id: number
	name: string
	title: string
	content: string
	steps: StepPropsData[]
}

export interface QuestProps {
	data: QuestPropsData
	questsCommander: QuestsCommander
}

class Quest {
	public readonly id: number
	public readonly name: string
	public readonly title: string
	public readonly content: string
	public readonly steps: QuestSteps

	private completed: boolean
	private active: boolean

	constructor(props: QuestProps) {
		this.id = props.data.id
		this.name = props.data.name
		this.title = props.data.title
		this.content = props.data.content
		this.steps = new QuestSteps({
			data: props.data.steps,
			questsCommander: props.questsCommander
		})

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

		for (let step of this.steps.getAllSteps()) {
			if (!step.isCompleted()) {
				bool = false
			}
		}

		return bool
	}

	public toActivate() {
		if (!this.canBeActivate()) {
			throw new Error('Cannot activate quest: '+this.name)
		}

		this.active = true
		this.steps.toActivateFirstStep()
	}

	public toFinish() {
		if (!this.canBeFinished()) {
			throw new Error('Cannot finished quest: '+this.name)
		}

		this.completed = true
		this.active = false
	}
}

export default Quest
