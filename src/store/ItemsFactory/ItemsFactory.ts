import Item from "../Items/Item"

import data from "./data"

let instance: ItemsFactory | undefined = undefined
class ItemsFactory {
	public create(itemId: number, type?: string): any {
		return this.getItem(itemId, type)
	}

	public getItemData(itemId: number): Item {
		return this.getItem(itemId)
	}

	private getItem(itemId: number, type: string | null = null): Item {
		const itemData = data.find((item) => item.id === itemId)

		if (itemData === undefined) {
			throw new Error('Item data not found. Id: ' + itemId)
		}

		if (type && itemData.type !== type) {
			throw new Error(`Item data has another type. Id: ${itemId} type: ${type}`)
		}

		return itemData
	}

	public static newInstance(): ItemsFactory {
		if (!instance) {
			instance = new ItemsFactory()
		}
		return instance
	}
}

export default ItemsFactory
