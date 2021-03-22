import { makeAutoObservable } from "mobx"

import Quest from "../Quest"
import QuestsCommander from "../QuestsCommander"
import QuestsRequirements from "../QuestsRequirements"

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
	public readonly requirements: QuestsRequirements
	public readonly quests: Quest[]

	private completed: boolean
	private active: boolean
	private currentQuestIndex: number

	constructor(props: QuestsGroupProps) {
		const { data, questsCommander } = props

		this.name = data.name
		this.meta = data.meta
		this.quests = data.quests

		this.requirements = new QuestsRequirements({
			requirements: data.requirements,
			questsCommander
		})

		this.completed = false
		this.active = false
		this.currentQuestIndex = 0

		this.requirements.subscribe()

		makeAutoObservable(this)
	}

	public getActiveQuest(): Quest | undefined {
		return this.quests.find((x) => x.isActive())
	}

	public isCompleted(): boolean {
		return this.completed
	}

	public isActive(): boolean {
		return this.active
	}

	public toActivate() {
		if (!this.requirements.check()) {
			throw new Error('Cannot activate group: '+this.name)
		}

		this.active = true
		this.quests[0].toActivate()
		this.requirements.unsubscribe()
	}

	public toFinish() {
		if (!this.checkQuestsCompletion()) {
			throw new Error('Cannot finish group: '+this.name)
		}

		this.completed = true
		this.active = false
	}

	public checkQuestsCompletion(): boolean {
		for (const quest of this.quests) {
			if (!quest.isCompleted()) return false
		}

		return true
	}
}

export default QuestsGroup
