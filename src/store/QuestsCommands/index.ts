import * as Balance from './Balance'
import * as Inventory from './Inventory'
import * as Level from './Level'

export const actions = {
	...Balance.actions,
	...Inventory.actions,
	...Level.actions
}

export const checkers = {
	...Balance.checkers,
	...Inventory.checkers,
	...Level.checkers
}