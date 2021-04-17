import { makeAutoObservable } from 'mobx'
import Item from '../Items/Item'
import { InventoryItemConstructor } from './types'

class PlayerInventoryItem {
  public id: number
  public item: Item
  private quantity: number

  constructor(props: InventoryItemConstructor) {
    this.id = props.item.id
    this.item = props.item
    this.quantity = props.quantity

    makeAutoObservable(this)
  }

  getQuantity(): number {
    return this.quantity
  }

  incrementQuantity(count: number): void {
    if (this.quantity + count > 999) throw new Error("Item's quantity > 999")

    this.quantity += count
  }

  decrementQuantity(count: number): void {
    if (this.quantity - count < 0) throw new Error("Item's quantity < 0")

    this.quantity -= count
  }
}

export default PlayerInventoryItem
