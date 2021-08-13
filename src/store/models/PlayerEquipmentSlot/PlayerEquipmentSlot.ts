import { makeAutoObservable } from 'mobx'
import Item from '../Item'
import { Items, ItemsTypes } from '../../../../types/Items'

class PlayerEquipmentSlot<T extends ItemsTypes> {
  private readonly type: T
  private readonly category: Items[T]['Categories'] | undefined
  private equipment: Item<T> | undefined

  constructor(type: T, category?: Items[T]['Categories']) {
    this.type = type
    this.category = category

    makeAutoObservable(this)
  }

  public getEquipment(): Item<T> | undefined {
    return this.equipment
  }

  public setEquipment(item: Item<T>): void {
    if (item.type !== this.type) {
      throw new Error('Type is wrong')
    }

    if (this.category && this.category !== item.category) {
      throw new Error('Category is wrong')
    }

    this.equipment = item
  }

  public unsetEquipment() {
    this.equipment = undefined
  }

  public existsEquipment(): boolean {
    return !!this.equipment
  }
}

export default PlayerEquipmentSlot
