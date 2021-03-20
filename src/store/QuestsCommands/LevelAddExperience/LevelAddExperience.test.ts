import PlayerLevel from "../../PlayerLevel"
import {LevelAddExperience} from "./LevelAddExperience"

it('Checking execute function', () => {
	const level = new PlayerLevel(1, 0)
	const command = new LevelAddExperience({
		level
	})

	command.execute(50)

	expect(level.getExperience()).toBe(50)

	command.execute(50)

	expect(level.getExperience()).toBe(0)
	expect(level.getLevel()).toBe(2)
})