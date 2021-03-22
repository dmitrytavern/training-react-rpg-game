import { makeAutoObservable, IReactionDisposer } from "mobx"

import QuestsCommander from "../QuestsCommander"

interface QuestAction {
	action: string
	payload: any
}

interface QuestRequirementsProps {
	requirements: QuestAction[]
	questsCommander: QuestsCommander
}

class QuestsRequirements {
	public readonly requirements: QuestAction[]

	private readonly commands: QuestsCommander
	private reactionDisposers: IReactionDisposer[]
	private requirementsState: boolean[]

	private canBeFinished: boolean
	private subscribed: boolean

	constructor(props: QuestRequirementsProps) {
		const { requirements, questsCommander } = props

		this.commands = questsCommander
		this.requirements = requirements
		this.reactionDisposers = []
		this.requirementsState = []

		this.canBeFinished = false
		this.subscribed = false

		makeAutoObservable(this)
	}

	public check(): boolean {
		return this.canBeFinished
	}

	public isSubscribed(): boolean {
		return this.subscribed
	}

	public subscribe() {
		if (this.subscribed) throw new Error('Already subscribed!')

		for (let i = 0; i < this.requirements.length; i++) {
			const {action, payload} = this.requirements[i]

			this.requirementsState.push(false)

			this.commands.subscribe(action, payload, (value: boolean, disposer: IReactionDisposer) => {
				this.requirementsState.splice(i, 1, value)
				this.reactionDisposers.splice(i, 1, disposer)
				this._check()
			})
		}

		if (this.requirementsState.length === 0) this._check()
		this.subscribed = true
	}

	public unsubscribe() {
		if (!this.subscribed) throw new Error('Not subscribe!')

		this.reactionDisposers.map((disposer) => disposer())

		this.subscribed = false
		this.canBeFinished = false
		this.requirementsState = []
		this.reactionDisposers = []
	}

	private _check() {
		for (let value of this.requirementsState) {
			if (!value) return this.canBeFinished = false
		}

		this.canBeFinished = true
	}
}

export default QuestsRequirements