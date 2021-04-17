import PlayerLevel from "../../../PlayerLevel"

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