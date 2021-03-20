import QuestsActionCommand from "../../QuestsActionCommand"
import PlayerLevel from "../../PlayerLevel"

interface CommandProps {
	level: PlayerLevel
}

export class LevelAddExperience extends QuestsActionCommand {
	private readonly level: PlayerLevel

	constructor(global: CommandProps) {
		super()

		this.level = global.level
	}

	public execute(payload: number) {
		this.level.addExperience(payload)
		this.level.floatExperience()
	}
}
