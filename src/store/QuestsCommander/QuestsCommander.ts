import { reaction } from "mobx"
import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import PlayerBalance from "../PlayerBalance"
import * as QuestsCommands from '../QuestsCommands'

interface Actions<T> {
	[key: string]: (context: QuestsCommanderContext, payload: any) => T
}

interface QuestsCommanderContext {
	level?: PlayerLevel
	inventory?: PlayerInventory
	balance?: PlayerBalance
}

class QuestsCommander {
	private readonly context: QuestsCommanderContext
	private readonly actions: Actions<void>
	private readonly checkers: Actions<boolean>

	constructor(props: QuestsCommanderContext) {
		this.context = props
		this.actions = QuestsCommands.actions
		this.checkers = QuestsCommands.checkers
	}

	public action(name: string, payload?: any): void {
		const action = this.actions[name]

		if (!action) {
			throw new Error('Not found action: '+name)
		}

		action.call(null, this.context, payload)
	}

	public subscribe(name: string, payload: any, callback: Function) {
		const fn = () => this.check(name, payload)

		const reactionDisposer = reaction(
			() => fn(),
			isExists => {callback(isExists, reactionDisposer)}
		)

		callback(fn(), reactionDisposer)
	}

	public check(name: string, payload: any): boolean {
		const checker = this.checkers[name]

		if (!checker) {
			throw new Error('Not found checker: '+name)
		}

		return checker.call(null, this.context, payload)
	}
}

export default QuestsCommander
