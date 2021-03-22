import PlayerLevel from "../../PlayerLevel"
import {reaction} from "mobx"

interface CommandContext {
	level?: PlayerLevel
}

export const levelCheckLevel = (context: CommandContext, payload: number, callback: Function): void => {
	const level = context.level

	if (!level) {
		throw new Error('Inventory is undefined')
	}

	const fun = () => level.getLevel() >= payload

	const reactionDisposer = reaction(
		() => fun(),
		isExists => {callback(isExists, reactionDisposer)}
	)

	callback(fun(), reactionDisposer)
}