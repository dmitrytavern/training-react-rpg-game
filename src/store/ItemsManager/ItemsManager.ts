import {Item} from "../../../types/Item"
import data from './data'

class ItemsManager {
	public create(itemId: number): Item {
		return this.getItem(itemId)
	}

	private getItem(itemId: number): Item {
		const itemData = data.find((item) => item.id === itemId)

		if (itemData === undefined) {
			throw new Error('Item data not found. Id: ' + itemId)
		}

		return itemData
	}
}

export default ItemsManager
