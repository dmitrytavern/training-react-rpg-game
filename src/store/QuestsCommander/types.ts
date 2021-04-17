import PlayerLevel from "../PlayerLevel"
import PlayerInventory from "../PlayerInventory"
import PlayerBalance from "../PlayerBalance"

export interface Actions<T> {
	[key: string]: (context: QuestsCommanderContext, payload: any) => T
}

export interface QuestsCommanderContext {
	level?: PlayerLevel
	inventory?: PlayerInventory
	balance?: PlayerBalance
}