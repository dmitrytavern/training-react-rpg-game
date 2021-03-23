import { makeAutoObservable, IReactionDisposer } from "mobx"

import QuestsCommander from "../QuestsCommander"

interface QuestAction {
	action: string
	payload: any
}

interface QuestsRequirementsData {
	[key: string]: {
		values: boolean[]
		disposers: IReactionDisposer[]
	}
}

class QuestsRequirements {
	private readonly commands: QuestsCommander
	private readonly data: QuestsRequirementsData

	constructor(questsCommander: QuestsCommander) {
		this.commands = questsCommander
		this.data = {}

		makeAutoObservable(this)
	}

	public subscribe(name: string, requirements: QuestAction[], callback: Function) {
		this.data[name] = {
			values: [],
			disposers: []
		}

		const data = this.data[name]
		for (let i = 0; i < requirements.length; i++) {
			const {action, payload} = requirements[i]

			data.values.push(false)

			this.commands.subscribe(action, payload, (value: boolean, disposer: IReactionDisposer) => {
				data.values.splice(i, 1, value)
				data.disposers.splice(i, 1, disposer)
				callback(this.check(name))
			})
		}

		if (data.values.length === 0) callback(true)
	}

	public unsubscribe(name: string) {
		this.data[name].disposers.map((disposer) => disposer())
		delete this.data[name]
	}

	public checkRequirements(requirements: QuestAction[]): boolean {
		for (let i = 0; i < requirements.length; i++) {
			const {action, payload} = requirements[i]
			const res = this.commands.check(action, payload)
			if (!res) return false
		}
		return true
	}

	private check(name: string): boolean {
		const data = this.data[name]

		if (!data) {
			throw new Error('Data not found: '+name)
		}

		const arr = data.values
		for (let i = 0; i < arr.length; i++) {
			if (!arr[i]) return false
		}
		return true
	}
}

export default QuestsRequirements