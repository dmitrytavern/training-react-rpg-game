import PlayerDefense from "./PlayerDefense"

const defensePercentFormula = (defense: number, lvl: number) => {
	return +(lvl * 0.1 + 50 * defense / (1500 + defense)).toFixed(2)
}

it('Check default value', () => {
	const defense = new PlayerDefense()

	expect(defense.getDefense()).toBe(0)
	expect(defense.getDefensePercent()).toBe(0)
})

it('Check value with level', () => {
	const defense = new PlayerDefense()

	defense.setPlayerLevel(() => 2)

	expect(defense.getDefense()).toBe(0)
	expect(defense.getDefensePercent()).toBe(0)
})

it('Check value with effect', () => {
	const defense = new PlayerDefense()

	defense.setDefenseEffect(() => 500)

	expect(defense.getDefense()).toBe(500)
	expect(defense.getDefensePercent()).toBe(defensePercentFormula(500, 1))
})

it('Check value with effect and level', () => {
	const defense = new PlayerDefense()

	defense.setPlayerLevel(() => 2)
	defense.setDefenseEffect(() => 500)

	expect(defense.getDefense()).toBe(500)
	expect(defense.getDefensePercent()).toBe(defensePercentFormula(500, 2))
})