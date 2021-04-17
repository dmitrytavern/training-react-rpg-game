import PlayerLevel from "../../../PlayerLevel"
import {reaction} from "mobx"

interface CommandContext {
	level?: PlayerLevel
}

export const checkLevel = (context: CommandContext, payload: number): boolean => {
	const level = context.level

	if (!level) {
		throw new Error('Inventory is undefined')
	}

	return level.getLevel() >= payload
}

export const subscribeCheckLevel = (context: CommandContext, payload: number, callback: Function): void => {
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