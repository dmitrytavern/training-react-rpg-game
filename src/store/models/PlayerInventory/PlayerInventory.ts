import { makeAutoObservable } from 'mobx'
import Item from '../Items/Item'
import { InventoryReturn } from './types'

class PlayerInventory {
  private readonly inventory: Item[]

  constructor() {
    this.inventory = []

    makeAutoObservable(this)
  }

  public getInventory(): InventoryReturn[] {
    const obj: { [key: string]: InventoryReturn } = {}

    for (const item of this.inventory) {
      if (obj.hasOwnProperty(item.uuid)) {
        obj[item.uuid][1] += 1
      } else {
        obj[item.uuid] = [item, 1]
      }
    }

    return Object.values(obj)
  }

  public getItem(itemId: string): InventoryReturn | undefined {
    let item = null
    let quantity = 0

    for (const _item of this.inventory) {
      if (_item.uuid === itemId) {
        if (!item) item = _item
        quantity++
      }
    }

    return item ? [item, quantity] : undefined
  }

  public addItem(item: Item, quantity: number): void {
    for (let i = 0; i < quantity; i++) {
      this.inventory.push(item)
    }
  }

  public removeItem(itemId: string, quantity: number): void {
    let _quantity = quantity

    for (const key in this.inventory) {
      if (_quantity === 0) break

      const item = this.inventory[key]

      if (_quantity > 0 && item.uuid === itemId) {
        this.inventory.splice(+key, 1)
        _quantity--
      }
    }

    if (_quantity > 0) {
      throw new Error('Not found more items!')
    }
  }

  public existsItem(itemId: string, quantity?: number): boolean {
    let exists = false

    let _quantity = 0

    for (const _item of this.inventory) {
      if (_item.uuid === itemId) _quantity++
    }

    if (_quantity > 0) exists = true

    if (exists) {
      if (!!quantity) return _quantity >= quantity
      return true
    }
    return false
  }
}

export default PlayerInventory
