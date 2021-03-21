import PlayerInventory from "../../PlayerInventory"

interface CommandPayload {
	itemId: number
	quantity: number
}

interface CommandContext {
	inventory?: PlayerInventory
}

export const inventoryRemoveItem = (context: CommandContext, payload: CommandPayload) => {
	const inventory = context.inventory

	if (!inventory) {
		throw new Error('Inventory is undefined')
	}

	inventory.removeItem(payload.itemId, payload.quantity)
}