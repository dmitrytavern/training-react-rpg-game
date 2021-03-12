import PlayerDefense from "./PlayerDefense"

const defensePercentFormula = (defense: number, lvl: number) => {
	return +(lvl * 0.1 + 50 * defense / (1500 + defense)).toFixed(2)
}

const calcDamagingFormula = (damage: number, defense: number, lvl: number) => {
	const percent = defensePercentFormula(defense, lvl)

	return damage / 100 * (100 - percent)
}

describe('Check value', () => {
	it('Default value', () => {
		const defense = new PlayerDefense()

		expect(defense.getDefense()).toBe(0)
		expect(defense.getDefensePercent()).toBe(0)
	})

	it('With level', () => {
		const defense = new PlayerDefense()

		defense.setPlayerLevel(() => 2)

		expect(defense.getDefense()).toBe(0)
		expect(defense.getDefensePercent()).toBe(0)
	})

	it('With effect', () => {
		const defense = new PlayerDefense()

		defense.setDefenseEffect(() => 500)

		expect(defense.getDefense()).toBe(500)
		expect(defense.getDefensePercent()).toBe(defensePercentFormula(500, 1))
	})

	it('With effect and level', () => {
		const defense = new PlayerDefense()

		defense.setPlayerLevel(() => 2)
		defense.setDefenseEffect(() => 500)

		expect(defense.getDefense()).toBe(500)
		expect(defense.getDefensePercent()).toBe(defensePercentFormula(500, 2))
	})

})

describe('Check calculate damage', () => {
	const damage = 500

	it('With default property', () => {
		const defense = new PlayerDefense()

		const availableDamage = defense.calculateDamaging(damage)

		expect(availableDamage).toBe(damage)
	})

	it('With effect', () => {
		const defense = new PlayerDefense()

		defense.setDefenseEffect(() => 500)

		const availableDamage = defense.calculateDamaging(damage)

		expect(availableDamage).toBe(calcDamagingFormula(damage, 500, 1))
	})

	it('With effect and level', () => {
		const defense = new PlayerDefense()

		defense.setPlayerLevel(() => 2)
		defense.setDefenseEffect(() => 500)

		const availableDamage = defense.calculateDamaging(damage)

		expect(availableDamage).toBe(calcDamagingFormula(damage, 500, 2))
	})
})
