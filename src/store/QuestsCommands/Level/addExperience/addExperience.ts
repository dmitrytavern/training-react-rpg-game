import PlayerLevel from "../../../PlayerLevel"

interface CommandContext {
	level?: PlayerLevel
}

export const addExperience = (context: CommandContext, payload: number) => {
	const level = context.level

	if (!level) {
		throw new Error('Level is undefined')
	}

	level.addExperience(payload)
	level.floatExperience()
}