interface QuestStepWatcher {
	target: string,
	value: any
}

interface QuestStepReward {
	action: string,
	value: any
}

interface QuestStep {
	name: string
	title: string
	description: string
	watcher?: QuestStepWatcher
	reward: QuestStepReward | null
}

class Quest {
	public readonly id: number
	public readonly name: string
	public readonly content: string
	public readonly steps: QuestStep[]

	private completed: boolean

	constructor() {
		this.id = 1
		this.name = 'Hello'
		this.content = 'Content of quest'
		this.completed = false

		this.steps = []
	}

	public isCompleted(): boolean {
		return this.completed
	}

	public setCompleted(bool: boolean) {
		this.completed = bool
	}
}

export default Quest
