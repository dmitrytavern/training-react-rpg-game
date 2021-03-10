import PlayerHealth from "./PlayerHealth"

describe('Check default properties', () => {
	it('Check health and maxHealth', () => {
		const health = new PlayerHealth(50, 100)

		expect(health.getHealth()).toBe(50)
		expect(health.getMaxHealth()).toBe(100)
	})

	it('Check alive when health > 0', () => {
		const health = new PlayerHealth(50, 100)

		expect(health.alive).toBeTruthy()
	})

	it('Check alive when health = 0', () => {
		const health = new PlayerHealth(0, 100)

		expect(health.alive).toBeFalsy()
	})
})

describe('Check increment function', () => {
	it('Increment health not to full', () => {
		const health = new PlayerHealth(50, 100)

		expect(health.getHealth()).toBe(50)

		health.incrementHealth(10)

		expect(health.getHealth()).toBe(60)
	})

	it('Increment health to full', () => {
		const health = new PlayerHealth(50, 100)

		expect(health.getHealth()).toBe(50)

		health.incrementHealth(50)

		expect(health.getHealth()).toBe(100)
	})

	it('Increment health to overfull', () => {
		const health = new PlayerHealth(50, 100)

		expect(health.getHealth()).toBe(50)

		health.incrementHealth(150)

		expect(health.getHealth()).toBe(100)
	})
})

describe('Check decrement function', () => {
	it('Decrement health not to full', () => {
		const health = new PlayerHealth(50, 100)

		expect(health.getHealth()).toBe(50)

		health.decrementHealth(10)

		expect(health.getHealth()).toBe(40)
		expect(health.alive).toBeTruthy()
	})

	it('Decrement health to full and check player alive', () => {
		const health = new PlayerHealth(50, 100)

		expect(health.getHealth()).toBe(50)

		health.decrementHealth(50)

		expect(health.getHealth()).toBe(0)
		expect(health.alive).toBeFalsy()
	})

	it('Decrement health to overfull and check player alive', () => {
		const health = new PlayerHealth(50, 100)

		expect(health.getHealth()).toBe(50)

		health.decrementHealth(150)

		expect(health.getHealth()).toBe(0)
		expect(health.alive).toBeFalsy()
	})
})