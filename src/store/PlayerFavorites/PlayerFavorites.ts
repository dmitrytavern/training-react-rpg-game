import {makeAutoObservable} from 'mobx'

class PlayerFavorites {
	private readonly ids: number[]

	constructor() {
		this.ids = []

		makeAutoObservable(this)
	}

	public getItems(): number[] {
		return this.ids
	}

	public setItem(itemId: number): void {
		this.ids.push(itemId)
	}

	public unsetItem(itemId: number): void {
		const index = this.ids.findIndex((x) => x === itemId)
		if (index !== -1) {
			this.ids.splice(index, 1)
		}
	}

	public exists(itemId: number): boolean {
		return this.ids.includes(itemId)
	}
}

export default PlayerFavorites
