import {makeAutoObservable} from 'mobx'
import PlayerInventoryItem from "../PlayerInventoryItem"

class PlayerInventory {
	private readonly inventory: Map<number, PlayerInventoryItem>

	constructor() {
		this.inventory = new Map()

		makeAutoObservable(this)
	}

	public getInventory(): PlayerInventoryItem[] {
		return Array.from(this.inventory, ([_, value]) => value)
	}

	public getItem(itemId: number): PlayerInventoryItem | undefined {
		return this.inventory.get(itemId)
	}

	public addItem(newItem: any, quantity: number): void {
		const item = this.getItem(newItem.id)

		if (item) {
			item.incrementQuantity(quantity)
		} else {
			this._addInventoryItem(newItem, quantity)
		}
	}

	public removeItem(itemId: number, quantity: number): void {
		const item = this.getItem(itemId)

		if (!item) throw new Error('Item not found!')

		item.decrementQuantity(quantity)

		if (item.getQuantity() <= 0) this.inventory.delete(itemId)
	}

	public existsItem(itemId: number, quantity?: number): boolean {
		const exists = this.inventory.has(itemId)
		if (exists) {
			if (!!quantity) {
				const quantityItem = this.inventory.get(itemId)?.getQuantity() || 0
				return quantityItem >= quantity
			}
			return true
		}
		return false
	}


	private _addInventoryItem(item: any, quantity: number): void {
		const newInventoryItem = new PlayerInventoryItem({
			item,
			quantity
		})

		this.inventory.set(item.id, newInventoryItem)
	}
}

export default PlayerInventory
