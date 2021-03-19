import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"

import QuestsCommand from "../QuestsCommands/QuestsCommand"
import InventoryAddItem from "../QuestsCommands/InventoryAddItem"
import InventoryRemoveItem from "../QuestsCommands/InventoryRemoveItem"
import LevelAddExperience from "../QuestsCommands/LevelAddExperience"

interface QuestsCommanderCommand {
	[key: string]: QuestsCommand
}

interface QuestsCommanderProps {
	level: PlayerLevel,
	inventory: PlayerInventory
}

class QuestsCommander {
	private readonly actions: QuestsCommanderCommand
	private readonly subscribes: QuestsCommanderCommand

	constructor(props: QuestsCommanderProps) {
		this.actions = {}
		this.subscribes = {}
		this.initActions(props)
		this.initSubscribes(props)
	}

	private initActions(props: QuestsCommanderProps) {
		this.actions['inventory:add_item'] = new InventoryAddItem(props)
		this.actions['inventory:remove_item'] = new InventoryRemoveItem(props)
		this.actions['level:add_experience'] = new LevelAddExperience(props)
	}

	private initSubscribes(props: QuestsCommanderProps) {
	}

	public action(name: string, payload?: any) {
		const action = this.actions[name]

		if (!action) {
			throw new Error('Not found action: '+name)
		}

		action.execute(payload)
	}

	public subscribe(name: string, callback: Function) {
		const subscribe = this.subscribes[name]

		if (!subscribe) {
			throw new Error('Not found action: '+name)
		}

		subscribe.execute(callback)
	}
}

export default QuestsCommander
