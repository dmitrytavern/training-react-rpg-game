import QuestsActionCommand from "../../QuestsActionCommand"
import PlayerInventory from "../../PlayerInventory"

interface CommandPayload {
	itemId: number
	quantity: number
}

interface CommandProps {
	inventory: PlayerInventory
}

export class InventoryRemoveItem extends QuestsActionCommand {
	private readonly inventory: PlayerInventory

	constructor(global: CommandProps) {
		super()

		this.inventory = global.inventory
	}

	public execute(payload: CommandPayload) {
		this.inventory.removeItem(payload.itemId, payload.quantity)
	}
}
