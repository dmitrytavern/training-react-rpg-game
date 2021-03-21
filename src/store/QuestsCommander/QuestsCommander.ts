import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"

import QuestsActionCommand from "../QuestsActionCommand"
import QuestsCheckCommand from "../QuestsCheckCommand"
import * as QuestsCommands from '../QuestsCommands'
import QuestsFactory from "../QuestsFactory";

interface Commands<T> {
	[key: string]: T
}

interface QuestsCommanderProps {
	level: PlayerLevel,
	inventory: PlayerInventory
	questsFactory?: QuestsFactory
}

class QuestsCommander {
	private readonly actions: Commands<QuestsActionCommand>
	private readonly checkers: Commands<QuestsCheckCommand>

	constructor(props: QuestsCommanderProps) {
		this.actions = {}
		this.checkers = {}
		this.initActions(props)
		this.initCheckers(props)
	}

	private initActions(props: QuestsCommanderProps) {
		this.actions['inventory:add_item'] = new QuestsCommands.InventoryAddItem(props)
		this.actions['inventory:remove_item'] = new QuestsCommands.InventoryRemoveItem(props)
		this.actions['level:add_experience'] = new QuestsCommands.LevelAddExperience(props)
	}

	private initCheckers(props: QuestsCommanderProps) {
		this.checkers['inventory:check_item'] = new QuestsCommands.InventoryCheckItem(props)
		this.checkers['quest:check_group_started'] = new QuestsCommands.QuestsCheckGroupStarted(props)
		this.checkers['quest:check_quest_completed'] = new QuestsCommands.QuestsCheckQuestCompleted(props)
	}

	public action(name: string, payload?: any): void {
		const action = this.actions[name]

		if (!action) {
			throw new Error('Not found action: '+name)
		}

		action.execute(payload)
	}

	public check(name: string, payload?: any): boolean {
		const action = this.checkers[name]

		if (!action) {
			throw new Error('Not found checker: '+name)
		}

		return action.check(payload)
	}
}

export default QuestsCommander
