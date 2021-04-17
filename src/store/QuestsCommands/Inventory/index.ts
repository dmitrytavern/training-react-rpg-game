import { addItem } from "./addItem"
import { checkItem, subscribeCheckItem } from "./checkItem"
import { removeItem } from "./removeItem"

export const actions = {
	'inventory:add_item': addItem,
	'inventory:remove_item': removeItem
}

export const subscribes = {
	'inventory:check_item': subscribeCheckItem
}

export const checkers = {
	'inventory:check_item': checkItem
}