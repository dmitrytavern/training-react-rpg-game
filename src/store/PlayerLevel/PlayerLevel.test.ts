import PlayerLevel from "./PlayerLevel"

const levelUpExpFormula = (lvl: number) => {
	return lvl * 100
}

const levelFormula = (lvl: number, exp: number) => {
	let newLvl = lvl
	let newExp = exp

	while (levelUpExpFormula(newLvl) <= newExp) {
		newExp -= levelUpExpFormula(newLvl)
		newLvl++
	}

	return {
		lvl: newLvl,
		exp: newExp,
		maxExp: levelUpExpFormula(newLvl)
	}
}

describe('Check default properties', () => {
	const module = new PlayerLevel(1, 0)
	const values = levelFormula(1, 0)

	it('Check level property', () => {
		expect(module.getLevel()).toBe(values.lvl)
	})

	it('Check experience property', () => {
		expect(module.getExperience()).toBe(values.exp)
	})

	it('Check experience for level up property', () => {
		expect(module.getExperienceForLevelUp()).toBe(values.maxExp)
	})
})


describe('Check adding experience', () => {
	it('Add exp for not level up', () => {
		const module = new PlayerLevel(1, 0)
		const values = levelFormula(1, 50)

		module.addExperience(50)
		module.floatExperience()

		expect(module.getLevel()).toBe(values.lvl)
		expect(module.getExperience()).toBe(values.exp)
		expect(module.getExperienceForLevelUp()).toBe(values.maxExp)
	})

	it('Add exp for one level up', () => {
		const module = new PlayerLevel(1, 0)
		const values = levelFormula(1, 100)

		module.addExperience(100)
		module.floatExperience()

		expect(module.getLevel()).toBe(values.lvl)
		expect(module.getExperience()).toBe(values.exp)
		expect(module.getExperienceForLevelUp()).toBe(values.maxExp)
	})

	it('Add exp for several level ups', () => {
		const module = new PlayerLevel(1, 0)
		const values = levelFormula(1, 300)

		module.addExperience(300)
		module.floatExperience()

		expect(module.getLevel()).toBe(values.lvl)
		expect(module.getExperience()).toBe(values.exp)
		expect(module.getExperienceForLevelUp()).toBe(values.maxExp)
	})

	it('Add exp for several level ups with the remainder of the experience', () => {
		const module = new PlayerLevel(1, 0)
		const values = levelFormula(1, 400)

		module.addExperience(400)
		module.floatExperience()

		expect(module.getLevel()).toBe(values.lvl)
		expect(module.getExperience()).toBe(values.exp)
		expect(module.getExperienceForLevelUp()).toBe(values.maxExp)
	})
})
