import {makeAutoObservable} from 'mobx'

import PlayerInventory from "../PlayerInventory"

class CraftMaterial {
	private inventory: PlayerInventory
	public id: number

	constructor(inventory: PlayerInventory, id: number) {
		this.inventory = inventory
		this.id = id

		makeAutoObservable(this)
	}

	public isAvailable(quantity: number = 1): boolean {
		return this.inventory.existsItem(this.id, quantity)
	}
}

export default CraftMaterial
