import QuestsCommand from "../QuestsCommand"
import PlayerInventory from "../../PlayerInventory"

interface CommandPayload {
	itemId: number
	quantity: number
}

interface CommandProps {
	inventory: PlayerInventory
}

class InventoryAddItem extends QuestsCommand {
	private readonly inventory: PlayerInventory

	constructor(global: CommandProps) {
		super()

		this.inventory = global.inventory
	}

	public execute(payload: CommandPayload) {
		this.inventory.addItem(payload.itemId, payload.quantity)
	}
}

export default InventoryAddItem
