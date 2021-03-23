import PlayerLevel from "../../PlayerLevel"
import {
	levelCheckLevel,
	levelSubscribeCheckLevel
} from "./levelCheckLevel"

it('Checking checker function', () => {
	const level = new PlayerLevel(1, 0)

	expect(levelCheckLevel({level}, 2)).toBeFalsy()

	level.addExperience(5000)
	level.floatExperience()

	expect(levelCheckLevel({level}, 2)).toBeTruthy()
	expect(levelCheckLevel({level}, 3)).toBeTruthy()
})

it('Checking subscribe function', () => {
	const level = new PlayerLevel(1, 0)

	levelSubscribeCheckLevel({level}, 2, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

it('Checking subscribe function with default value', () => {
	const level = new PlayerLevel(2, 0)

	levelSubscribeCheckLevel({level}, 2, (value: boolean, disposer: Function) => {
		expect(value).toBeTruthy()
		disposer()
	})

	level.addExperience(5000)
})