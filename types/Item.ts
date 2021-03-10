import { Effect } from "./Effect"

export interface Item {
	readonly id: number
	readonly type: string
	readonly name: string
	readonly effects: Effect[]
}