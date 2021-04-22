import Item from '../Item'
import { Effect } from '../../../../types/Effect'

import { ItemArmorType, ItemArmorProps, ItemArmorMeta, ItemArmorCategories } from './types'

import { uuidGenerator } from '../../../utils/uuidGenerator'

class ItemArmor extends Item {
  public readonly meta: ItemArmorMeta
  public readonly type: ItemArmorType
  public readonly category: ItemArmorCategories
  public readonly effects: Effect[]

  constructor(props: ItemArmorProps) {
    const { category, meta, effects } = props
    super(props)

    this.type = 'Armor'
    this.meta = meta
    this.category = category
    this.effects = effects
  }

  get uuid(): string {
    return uuidGenerator([['ID', this.id]])
  }
}

export default ItemArmor
