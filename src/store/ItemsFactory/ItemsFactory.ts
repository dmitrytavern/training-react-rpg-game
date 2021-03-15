import Item from "../Items/Item"
import ItemWeapon from "../Items/ItemWeapon"
import ItemArmor from "../Items/ItemArmor"
import ItemPotion from "../Items/ItemPotion"
import ItemTrash from "../Items/ItemTrash"

import data from "./data"

class ItemsFactory {
	create(itemId: number, type: 'weapon'): ItemWeapon
	create(itemId: number, type: 'armor'): ItemArmor
	create(itemId: number, type: 'potion'): ItemPotion
	create(itemId: number, type: 'trash'): ItemTrash
	create(itemId: number, type?: string): Item
	create(itemId: number, type?: string): any {
		return this.getItem(itemId, type)
	}

	private getItem(itemId: number, type: string | null = ''): Item {
		const itemData = data.find((item) => item.id === itemId)

		if (itemData === undefined) {
			throw new Error('Item data not found. Id: ' + itemId)
		}

		if (type && itemData.type !== type) {
			throw new Error(`Item data has another type. Id: ${itemId} type: ${type}`)
		}

		return itemData
	}
}

export default ItemsFactory
