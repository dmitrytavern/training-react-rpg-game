import { makeAutoObservable } from 'mobx'
import Item from '../Item'
import ItemsFactory from '../ItemFactory'
import { ItemTypes } from '../Item/types'

type Inventory = [key: Item<any>, quantity: number]

class PlayerInventory {
  private readonly inventory: Inventory[]
  private _itemFactory: ItemsFactory | undefined

  private get itemFactory(): ItemsFactory {
    if (!this._itemFactory) throw new Error('Item Factory not exists!')
    return this._itemFactory
  }

  constructor() {
    this.inventory = []

    makeAutoObservable(this)
  }

  public setItemsFactory(itemFactory: ItemsFactory) {
    this._itemFactory = itemFactory
  }

  public getInventory(): Inventory[] {
    return this.inventory
  }

  public getItem<T extends ItemTypes>(uuid: string, type?: T): Item<T> | undefined {
    for (const [item] of this.inventory) {
      if (uuid === item.uuid) {
        return this.getObject(uuid, type)
      }
    }
  }

  public addItem<T extends ItemTypes>(id: number, quantity?: number, type?: T): Item<T> {
    const inventory = this.inventory
    const item = this.createObject(id, type)
    const incrementQuantity = quantity || 1

    if (incrementQuantity <= 0) {
      throw new Error('You try create unique item, but quantity less or equal 0')
    }

    if (item.getSetting('unique')) {
      if (incrementQuantity > 1) {
        throw new Error('You try create unique item, but quantity more then 1')
      }
    }

    for (const exp of inventory) {
      if (item.uuid === exp[0].uuid) {
        exp[1] = exp[1] + incrementQuantity

        return item as Item<T>
      }
    }

    this.inventory.push([item, incrementQuantity])

    return item as Item<T>
  }

  public removeItem(uuid: string, quantity?: number): void {
    const inventory = this.inventory
    const decrementQuantity = quantity || 1

    for (const exp of inventory) {
      if (uuid === exp[0].uuid) {
        const newQuantity = exp[1] - decrementQuantity

        if (newQuantity < 0) {
          throw new Error('You try remove item with less quantity')
        }

        if (newQuantity > 0) {
          exp[1] = newQuantity
        } else {
          const index = inventory.indexOf(exp)
          this.inventory.splice(index, 1)
          this.deleteObject(uuid)
        }

        break
      }
    }
  }

  public removeItemById(id: number, quantity?: number) {
    const inventory = this.inventory
    const decrementQuantity = quantity || 1

    for (const exp of inventory) {
      if (id === exp[0].id) {
        const newQuantity = exp[1] - decrementQuantity

        if (newQuantity < 0) {
          throw new Error('You try remove item with less quantity')
        }

        if (newQuantity > 0) {
          exp[1] = newQuantity
        } else {
          const index = inventory.indexOf(exp)
          this.inventory.splice(index, 1)
          this.deleteObject(exp[0].uuid)
        }

        break
      }
    }
  }

  public existsItem(uuid: string, quantity?: number): boolean {
    const inventory = this.inventory
    const necessaryQuantity = quantity || 1

    for (const [item, _quantity] of inventory) {
      if (uuid === item.uuid) {
        if (_quantity >= necessaryQuantity) {
          return true
        }
      }
    }

    return false
  }

  public existsItemById(id: number, quantity?: number) {
    const inventory = this.inventory
    const necessaryQuantity = quantity || 1

    for (const [item, _quantity] of inventory) {
      if (id === item.id) {
        if (_quantity >= necessaryQuantity) {
          return true
        }
      }
    }

    return false
  }

  private getObject<T extends ItemTypes>(uuid: string, type?: T): Item<T> {
    const item = this.itemFactory.getItem(uuid, type)

    if (!item) {
      throw new Error('Inventory have uuid, but in factory have not object for this uuid')
    }

    return item
  }

  private createObject<T extends ItemTypes>(id: number, type?: T): Item<T> {
    return this.itemFactory.create({ id, type })
  }

  private deleteObject(uuid: string) {
    this.itemFactory.delete(uuid)
  }
}

export default PlayerInventory
