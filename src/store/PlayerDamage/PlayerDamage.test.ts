import PlayerDamage from "./PlayerDamage"

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