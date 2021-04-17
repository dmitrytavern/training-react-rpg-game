import PlayerInventory from "../../../PlayerInventory"
import {reaction} from "mobx"

interface CommandPayload {
	itemId: number
	quantity: number
}

interface CommandContext {
	inventory?: PlayerInventory
}

export const checkItem = (context: CommandContext, payload: CommandPayload): boolean => {
	const inventory = context.inventory

	if (!inventory) {
		throw new Error('Inventory is undefined')
	}

	return inventory.existsItem(payload.itemId, payload.quantity)
}

export const subscribeCheckItem = (context: CommandContext, payload: CommandPayload, callback: Function): void => {
	const inventory = context.inventory

	if (!inventory) {
		throw new Error('Inventory is undefined')
	}

	const exists = () => inventory.existsItem(payload.itemId, payload.quantity)

	const reactionDisposer = reaction(
		() => exists(),
		isExists => {callback(isExists, reactionDisposer)}
	)

	callback(exists(), reactionDisposer)
}