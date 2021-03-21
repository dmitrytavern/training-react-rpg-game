import PlayerInventory from "../../PlayerInventory"

interface CommandPayload {
	itemId: number
	quantity: number
}

interface CommandContext {
	inventory?: PlayerInventory
}

export const inventoryCheckItem = (context: CommandContext, payload: CommandPayload): boolean => {
	const inventory = context.inventory

	if (!inventory) {
		throw new Error('Inventory is undefined')
	}

	return inventory.existsItem(payload.itemId, payload.quantity)
}