import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import * as QuestsCommands from '../QuestsCommands'

interface Commands<T> {
	[key: string]: (context: QuestsCommanderContext, payload: any) => T
}

interface QuestsCommanderContext {
	level?: PlayerLevel,
	inventory?: PlayerInventory
}

class QuestsCommander {
	private readonly context: QuestsCommanderContext
	private readonly actions: Commands<void>
	private readonly checkers: Commands<boolean>

	constructor(props: QuestsCommanderContext) {
		this.context = props
		this.actions = {}
		this.checkers = {}
		this.initActions()
		this.initCheckers()
	}

	private initActions() {
		this.actions['inventory:add_item'] = QuestsCommands.inventoryAddItem
		this.actions['inventory:remove_item'] = QuestsCommands.inventoryRemoveItem
		this.actions['level:add_experience'] = QuestsCommands.levelAddExperience
	}

	private initCheckers() {
		this.checkers['inventory:check_item'] = QuestsCommands.inventoryCheckItem
	}

	public action(name: string, payload?: any): void {
		const action = this.actions[name]

		if (!action) {
			throw new Error('Not found action: '+name)
		}

		action.call(null, this.context, payload)
	}

	public check(name: string, payload?: any): boolean {
		const action = this.checkers[name]

		if (!action) {
			throw new Error('Not found checker: '+name)
		}

		return action.call(null, this.context, payload)
	}
}

export default QuestsCommander
