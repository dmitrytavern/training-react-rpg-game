import { addItem } from "./addItem"
import { checkItem } from "./checkItem"
import { removeItem } from "./removeItem"

export const actions = {
	'inventory:add_item': addItem,
	'inventory:remove_item': removeItem
}

export const checkers = {
	'inventory:check_item': checkItem
}