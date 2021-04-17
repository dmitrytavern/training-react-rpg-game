import PlayerLevel from "../../../PlayerLevel"
import {
	checkLevel,
	subscribeCheckLevel
} from "./checkLevel"

it('Checking checker function', () => {
	const level = new PlayerLevel(1, 0)

	expect(checkLevel({level}, 2)).toBeFalsy()

	level.addExperience(5000)
	level.floatExperience()

	expect(checkLevel({level}, 2)).toBeTruthy()
	expect(checkLevel({level}, 3)).toBeTruthy()
})

it('Checking subscribe function', () => {
	const level = new PlayerLevel(1, 0)

	subscribeCheckLevel({level}, 2, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

it('Checking subscribe function with default value', () => {
	const level = new PlayerLevel(2, 0)

	subscribeCheckLevel({level}, 2, (value: boolean, disposer: Function) => {
		expect(value).toBeTruthy()
		disposer()
	})

	level.addExperience(5000)
})