import * as Balance from './Balance'
import * as Inventory from './Inventory'
import * as Level from './Level'

export const actions = {
	...Balance.actions,
	...Inventory.actions,
	...Level.actions
}

export const subscribes = {
	...Balance.subscribes,
	...Inventory.subscribes,
	...Level.subscribes
}

export const checkers = {
	...Balance.checkers,
	...Inventory.checkers,
	...Level.checkers
}