import PlayerDamage from "./PlayerDamage"

const damageFormula = (dmg: number, lvl: number, strength: number) => {
	return dmg * lvl * strength
}

describe('Checking damage range', () => {
	it('Checking damage range with 1-2', () => {
		const damage = new PlayerDamage(1, 2)

		for (let i=0; i <= 50; i++) {
			expect(
				damage.getDamage() >= 1 && damage.getDamage() <= 2
			).toBeTruthy()
		}
	})

	it('Checking damage range with 10-20', () => {
		const damage = new PlayerDamage(10, 20)

		for (let i=0; i <= 100; i++) {
			expect(
				damage.getDamage() >= 10 && damage.getDamage() <= 20
			).toBeTruthy()
		}
	})


	it('Checking damage range with 1-1', () => {
		const damage = new PlayerDamage(1, 1)

		expect(damage.getDamage()).toBe(1)
	})
})

describe('Checking damage range with effects', () => {
	const lvl = 2
	const effect = 10
	const strength = 4

	it('Checking damage range with 1-2', () => {
		const min = 1
		const max = 2
		const damage = new PlayerDamage(min, max)

		damage.setComputedFunction('level', () => lvl)
		damage.setComputedFunction('effects', () => effect)
		damage.setComputedFunction('strength', () => strength)

		for (let i=0; i <= 50; i++) {
			expect(damage.getDamage()).toBeGreaterThanOrEqual(damageFormula(min, lvl, strength) + effect)
			expect(damage.getDamage()).toBeLessThanOrEqual(damageFormula(max, lvl, strength) + effect)
		}
	})

	it('Checking damage range with 10-20', () => {
		const min = 10
		const max = 20
		const damage = new PlayerDamage(min, max)
		const strength = 4

		damage.setComputedFunction('level', () => lvl)
		damage.setComputedFunction('effects', () => effect)
		damage.setComputedFunction('strength', () => strength)

		for (let i=0; i <= 100; i++) {
			expect(damage.getDamage()).toBeGreaterThanOrEqual(damageFormula(min, lvl, strength) + effect)
			expect(damage.getDamage()).toBeLessThanOrEqual(damageFormula(max, lvl, strength) + effect)
		}
	})

	it('Checking damage range with 1-1', () => {
		const dmg = 1
		const damage = new PlayerDamage(dmg, dmg)

		damage.setComputedFunction('level', () => lvl)
		damage.setComputedFunction('effects', () => effect)
		damage.setComputedFunction('strength', () => strength)

		expect(damage.getDamage()).toBe(damageFormula(dmg, lvl, strength) + effect)
	})
})