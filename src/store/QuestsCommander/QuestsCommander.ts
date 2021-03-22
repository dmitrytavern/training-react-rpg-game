import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import PlayerBalance from "../PlayerBalance"
import * as QuestsCommands from '../QuestsCommands'

interface Actions<T> {
	[key: string]: (context: QuestsCommanderContext, payload: any) => T
}

interface Subscribe<T> {
	[key: string]: (context: QuestsCommanderContext, payload: any, callback: Function) => T
}

interface QuestsCommanderContext {
	level?: PlayerLevel
	inventory?: PlayerInventory
	balance?: PlayerBalance
}

class QuestsCommander {
	private readonly context: QuestsCommanderContext
	private readonly actions: Actions<void>
	private readonly subscribes: Subscribe<void>

	constructor(props: QuestsCommanderContext) {
		this.context = props
		this.actions = {}
		this.subscribes = {}
		this.initActions()
		this.initSubscribes()
	}

	private initActions() {
		this.actions['inventory:add_item'] = QuestsCommands.inventoryAddItem
		this.actions['inventory:remove_item'] = QuestsCommands.inventoryRemoveItem
		this.actions['level:add_experience'] = QuestsCommands.levelAddExperience
	}

	public initSubscribes() {
		this.subscribes['inventory:check_item'] = QuestsCommands.inventoryCheckItem
		this.subscribes['balance:check_money_balance'] = QuestsCommands.balanceCheckMoney
		this.subscribes['balance:check_money_getting'] = QuestsCommands.balanceCheckMoneyGetting
		this.subscribes['level:check_level'] = QuestsCommands.levelCheckLevel
	}

	public action(name: string, payload?: any): void {
		const action = this.actions[name]

		if (!action) {
			throw new Error('Not found action: '+name)
		}

		action.call(null, this.context, payload)
	}

	public subscribe(name: string, payload: any, callback: Function) {
		const subscribe = this.subscribes[name]

		if (!subscribe) {
			throw new Error('Not found subscribes: '+name)
		}

		subscribe.apply(null, [this.context, payload, callback])
	}
}

export default QuestsCommander
