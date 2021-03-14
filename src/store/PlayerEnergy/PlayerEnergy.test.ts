import PlayerEnergy from "./PlayerEnergy"

const maxEnergyFormula = (max: number, lvl: number, endurance: number) => {
	return max * lvl * endurance
}

it('Check default properties', () => {
	const energy = new PlayerEnergy(50, 100)

	expect(energy.getEnergy()).toBe(50)
	expect(energy.getMaxEnergy()).toBe(100)
})

it('Check default properties with effects', () => {
	const startMaxEnergy = 100
	const lvl = 2
	const effect = 300
	const endurance = 4
	const energy = new PlayerEnergy(50, startMaxEnergy)

	energy.setPlayerLevel(() => lvl)
	energy.setMaxEnergyEffect(() => effect)
	energy.setEnduranceCharacteristic(() => endurance)

	expect(energy.getEnergy()).toBe(50)
	expect(energy.getMaxEnergy()).toBe(
		maxEnergyFormula(startMaxEnergy, lvl, endurance) + effect
	)
})

describe('Check increment function', () => {
	it('Increment energy not to full', () => {
		const energy = new PlayerEnergy(50, 100)

		expect(energy.getEnergy()).toBe(50)

		energy.incrementHealth(10)

		expect(energy.getEnergy()).toBe(60)
	})

	it('Increment energy to full', () => {
		const energy = new PlayerEnergy(50, 100)

		expect(energy.getEnergy()).toBe(50)

		energy.incrementHealth(50)

		expect(energy.getEnergy()).toBe(100)
	})

	it('Increment energy to overfull', () => {
		const energy = new PlayerEnergy(50, 100)

		expect(energy.getEnergy()).toBe(50)

		energy.incrementHealth(150)

		expect(energy.getEnergy()).toBe(100)
	})
})

describe('Check increment function with effects', () => {
	const startMaxEnergy = 100
	const lvl = 2
	const effect = 300
	const endurance = 4
	const expectValue = maxEnergyFormula(startMaxEnergy, lvl, endurance) + effect

	it('Increment energy to full with effects', () => {
		const health = new PlayerEnergy(50, startMaxEnergy)

		health.setPlayerLevel(() => lvl)
		health.setMaxEnergyEffect(() => effect)
		health.setEnduranceCharacteristic(() => endurance)

		expect(health.getEnergy()).toBe(50)

		health.incrementHealth(expectValue - 50)

		expect(health.getEnergy()).toBe(expectValue)
	})

	it('Increment energy to overfull with effects', () => {
		const health = new PlayerEnergy(50, startMaxEnergy)

		health.setPlayerLevel(() => lvl)
		health.setMaxEnergyEffect(() => effect)
		health.setEnduranceCharacteristic(() => endurance)

		expect(health.getEnergy()).toBe(50)

		health.incrementHealth(expectValue + 1000)

		expect(health.getEnergy()).toBe(expectValue)
	})
})

describe('Check decrement function', () => {
	it('Decrement energy not to full', () => {
		const energy = new PlayerEnergy(50, 100)

		expect(energy.getEnergy()).toBe(50)

		energy.decrementHealth(10)

		expect(energy.getEnergy()).toBe(40)
	})

	it('Decrement energy to full', () => {
		const energy = new PlayerEnergy(50, 100)

		expect(energy.getEnergy()).toBe(50)

		energy.decrementHealth(50)

		expect(energy.getEnergy()).toBe(0)
	})

	it('Decrement energy to overfull', () => {
		const energy = new PlayerEnergy(50, 100)

		expect(energy.getEnergy()).toBe(50)

		energy.decrementHealth(150)

		expect(energy.getEnergy()).toBe(0)
	})
})