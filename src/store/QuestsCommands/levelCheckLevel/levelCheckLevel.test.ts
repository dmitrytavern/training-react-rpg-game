import PlayerLevel from "../../PlayerLevel"
import { levelCheckLevel } from "./levelCheckLevel"

it('Checking subscribe function', () => {
	const level = new PlayerLevel(1, 0)

	levelCheckLevel({level}, 2, (value: boolean, disposer: Function) => {
		expect(value).toBeFalsy()
		disposer()
	})
})

it('Checking subscribe function with default value', () => {
	const level = new PlayerLevel(2, 0)

	levelCheckLevel({level}, 2, (value: boolean, disposer: Function) => {
		expect(value).toBeTruthy()
		disposer()
	})

	level.addExperience(5000)
})