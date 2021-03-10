function randomInteger(min: number, max: number) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

class PlayerDamage {
	private readonly minDamage: number
	private readonly maxDamage: number

	constructor(minDamage: number, maxDamage: number) {
		this.minDamage = minDamage
		this.maxDamage = maxDamage
	}

	public getDamage(): number {
		return randomInteger(this.minDamage, this.maxDamage)
	}

	public getMinDamage(): number {
		return this.minDamage
	}

	public getMaxDamage(): number {
		return this.maxDamage
	}
}

export default PlayerDamage
