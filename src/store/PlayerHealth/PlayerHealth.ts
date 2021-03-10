class PlayerHealth {
	private readonly maxHealth: number
	private health: number

	constructor(health: number, maxHealth: number) {
		this.health = health
		this.maxHealth = maxHealth // DELETE IT!
	}

	public get alive(): boolean {
		return this.health > 0
	}

	public getHealth() {
		return this.health
	}

	public getMaxHealth() {
		return this.maxHealth
	}

	public incrementHealth(count: number): void {
		let _val = this.health + count
		if (_val > this.maxHealth) _val = this.maxHealth
		this.health = _val
	}

	public decrementHealth(count: number): void {
		let _val = this.health - count
		if (_val < 0) _val = 0
		this.health = _val
	}
}

export default PlayerHealth
