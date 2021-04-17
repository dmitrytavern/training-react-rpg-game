import { makeAutoObservable } from 'mobx'
import ItemWeapon from '../Items/ItemWeapon'
import ItemArmor from '../Items/ItemArmor'

class PlayerEquipmentSlot<T extends ItemArmor | ItemWeapon> {
  private readonly type: string
  private readonly category: string | null
  private equipment: T | undefined

  constructor(type: string, category: string | null = null) {
    this.type = type
    this.category = category

    makeAutoObservable(this)
  }

  public getName(): string {
    return this.equipment?.name || ''
  }

  public getEquipment(): T | undefined {
    return this.equipment
  }

  public setEquipment(item: T): void {
    if (item.type !== this.type) {
      throw new Error('Type is wrong')
    }

    if (this.category && item.category !== this.category) {
      throw new Error('Category is wrong')
    }

    this.equipment = item
  }

  public unsetEquipment() {
    this.equipment = undefined
  }

  public getEffects(): Array<any> {
    return this.equipment?.effects || []
  }

  public existsEquipment(): boolean {
    return !!this.equipment
  }
}

export default PlayerEquipmentSlot
