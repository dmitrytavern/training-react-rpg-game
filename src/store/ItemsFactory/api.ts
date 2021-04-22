import ItemsFactory from './ItemsFactory'
import { itemTypes, ReturnItem } from './types'

interface Context {
  itemsFactory?: ItemsFactory
}

interface createPayload<T extends keyof itemTypes> {
  id: number
  type: T
}

class Api {
  public static getItemData(context: Context, payload: number) {
    const itemsFactory = context.itemsFactory

    if (!itemsFactory) {
      throw new Error('Craft is undefined')
    }

    return itemsFactory.getItemData(payload)
  }

  static create(context: Context, payload: createPayload<'Tool'>): ReturnItem<'Tool'>
  static create(context: Context, payload: createPayload<'Material'>): ReturnItem<'Material'>
  static create(context: Context, payload: createPayload<'Potion'>): ReturnItem<'Potion'>
  static create(context: Context, payload: createPayload<'Weapon'>): ReturnItem<'Weapon'>
  static create(context: Context, payload: createPayload<'Armor'>): ReturnItem<'Armor'>
  public static create<T extends keyof itemTypes>(
    context: Context,
    payload: createPayload<T>
  ): ReturnItem<T> {
    const itemsFactory = context.itemsFactory

    if (!itemsFactory) {
      throw new Error('ItemsFactory is undefined')
    }

    return itemsFactory.create(payload.id, payload.type)
  }
}

const ItemsApi = {
  'items:get_data': Api.getItemData,
  'items:create': Api.create,
}

export default ItemsApi
