import QuestsCheckCommand from "../../QuestsCheckCommand"
import PlayerInventory from "../../PlayerInventory"

interface CommandPayload {
	itemId: number
	quantity: number
}

interface CommandProps {
	inventory: PlayerInventory
}

export class InventoryCheckItem extends QuestsCheckCommand {
	private readonly inventory: PlayerInventory

	constructor(global: CommandProps) {
		super()

		this.inventory = global.inventory
	}

	public check(payload: CommandPayload) {
		return this.inventory.existsItem(payload.itemId, payload.quantity)
	}
}
