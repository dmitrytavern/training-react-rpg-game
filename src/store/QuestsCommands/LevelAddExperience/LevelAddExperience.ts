import QuestsCommand from "../QuestsCommand"
import PlayerLevel from "../../PlayerLevel"

interface CommandPayload {
	value: number
}

interface CommandProps {
	level: PlayerLevel
}

class LevelAddExperience extends QuestsCommand {
	private readonly level: PlayerLevel

	constructor(global: CommandProps) {
		super()

		this.level = global.level
	}

	public execute(payload: CommandPayload) {
		this.level.addExperience(payload.value)
		this.level.floatExperience()
	}
}

export default LevelAddExperience
