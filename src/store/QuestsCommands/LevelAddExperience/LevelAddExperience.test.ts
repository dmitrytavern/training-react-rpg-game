import PlayerLevel from "../../PlayerLevel"
import {levelAddExperience} from "./LevelAddExperience"

it('Checking execute function', () => {
	const level = new PlayerLevel(1, 0)

	levelAddExperience({level}, 50)

	expect(level.getExperience()).toBe(50)

	levelAddExperience({level}, 50)

	expect(level.getExperience()).toBe(0)
	expect(level.getLevel()).toBe(2)
})