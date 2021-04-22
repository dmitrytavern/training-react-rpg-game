import Item from '../Item'
import { Effect } from '../../../../../types/Effect'

import { ItemWeaponType, ItemWeaponCategories, ItemWeaponProps, ItemWeaponMeta } from './types'

import { uuidGenerator } from '../../../../utils/uuidGenerator'

class ItemWeapon extends Item {
  public readonly meta: ItemWeaponMeta
  public readonly type: ItemWeaponType
  public readonly category: ItemWeaponCategories
  public readonly effects: Effect[]

  constructor(props: ItemWeaponProps) {
    const { meta, category, effects } = props
    super(props)

    this.type = 'Weapon'
    this.meta = meta
    this.category = category
    this.effects = effects
  }

  public getEffects() {}

  public get uuid(): string {
    return uuidGenerator([
      ['', 'WEAPON'],
      ['ID', this.id],
    ])
  }
}

export default ItemWeapon
