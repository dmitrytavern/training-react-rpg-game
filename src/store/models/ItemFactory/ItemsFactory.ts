import { makeAutoObservable } from 'mobx'
import Item from '../Item'
import { ItemProps } from '../Item/types'
import { CreatePayload, ItemKeys } from './types'

import data from './data'

class ItemsFactory {
  private readonly data: ItemProps<ItemKeys>[]
  private readonly items: Item<ItemKeys>[]

  constructor() {
    this.items = []
    this.data = data

    makeAutoObservable(this)
  }

  public create<T extends ItemKeys>(payload: CreatePayload<T>): Item<T> {
    const data = this.getData(payload.id)

    if (!data) {
      throw new Error(`Item data not found. id: ${payload.id}`)
    }

    if (payload.type && data.type !== payload.type) {
      throw new Error(
        `Item data type not equal with payload. id: ${payload.id} type: ${payload.type}`
      )
    }

    return this.createItem(data, payload)
  }

  public delete(uuid: string): void {
    const arr = this.items
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (item.uuid === uuid) {
        this.items.splice(i, 1)
        break
      }
    }
  }

  public getItem<T extends ItemKeys>(uuid: string, type?: T): Item<T> | undefined {
    const arr = this.items
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (item.uuid === uuid) {
        if (type) {
          if (type === item.type) return item as Item<T>
          throw new Error('Type in argument not equal with type in item.')
        } else {
          return item as Item<T>
        }
      }
    }
  }

  public getItemsById<T extends ItemKeys>(id: number, type?: T): Item<T>[] {
    return this.items.filter((x) => {
      if (x.id === id) {
        if (type) {
          if (type === x.type) return true
        } else {
          return true
        }
      }
      return false
    }) as Item<T>[]
  }

  private createItem<T extends ItemKeys>(data: ItemProps<T>, payload: CreatePayload<T>): Item<T> {
    let createItem = data.settings.unique

    if (!createItem) {
      const _res = this.items.find((x) => {
        if (x.id === payload.id) {
          if (payload.type) {
            return x.type === payload.type
          }
          return true
        }
        return false
      }) as Item<T> | undefined
      if (_res) return _res
      createItem = true
    }

    if (createItem) {
      const item = new Item<T>(data)
      this.items.push(item)
      return item
    }

    throw new Error('Has problem!')
  }

  private getData(id: number): ItemProps<any> | undefined {
    return this.data.find((x) => x.id === id)
  }
}

export default ItemsFactory
