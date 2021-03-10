import PlayerEnergy from "./PlayerEnergy"

it('Check default properties', () => {
	const energy = new PlayerEnergy(50, 100)

	expect(energy.getEnergy()).toBe(50)
	expect(energy.getMaxEnergy()).toBe(100)
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