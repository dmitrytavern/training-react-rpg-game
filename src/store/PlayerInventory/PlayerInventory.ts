import { makeAutoObservable } from 'mobx'
import PlayerInventoryItem from '../PlayerInventoryItem'
import ItemsFactory from '../ItemsFactory'

class PlayerInventory {
  private readonly inventory: Map<number, PlayerInventoryItem>
  private readonly itemsFactory: ItemsFactory | undefined

  constructor() {
    this.inventory = new Map()
    this.itemsFactory = ItemsFactory.newInstance()

    makeAutoObservable(this)
  }

  public getInventory(): PlayerInventoryItem[] {
    return Array.from(this.inventory, ([_, value]) => value)
  }

  public getItem(itemId: number): PlayerInventoryItem | undefined {
    return this.inventory.get(itemId)
  }

  public addItem(itemId: number, quantity: number): void {
    const item = this.getItem(itemId)

    if (item) {
      item.incrementQuantity(quantity)
    } else {
      this._addInventoryItem(itemId, quantity)
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

  private _addInventoryItem(itemId: number, quantity: number): void {
    if (!this.itemsFactory) {
      throw new Error('ItemsFactory in PlayerInventory is not defined')
    }

    const item = this.itemsFactory.create(itemId)
    const newInventoryItem = new PlayerInventoryItem({
      item,
      quantity,
    })

    this.inventory.set(item.id, newInventoryItem)
  }
}

export default PlayerInventory
