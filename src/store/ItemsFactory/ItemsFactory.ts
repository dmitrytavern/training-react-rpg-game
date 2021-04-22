import Item from '../Items/Item'
import { ReturnItem, itemTypes } from './types'

import data from './data'

let instance: ItemsFactory | undefined = undefined
class ItemsFactory {
  public create<T extends keyof itemTypes>(itemId: number, type: T): ReturnItem<T> {
    return this.getItem(itemId, type)
  }

  public getItemData(itemId: number): Item {
    return this.getItem(itemId)
  }

  private getItem<T extends keyof itemTypes>(itemId: number, type: T | null = null): ReturnItem<T> {
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
