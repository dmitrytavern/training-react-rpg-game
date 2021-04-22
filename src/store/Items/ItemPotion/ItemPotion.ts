import Item from '../Item'

import { ItemPotionType, ItemPotionProps, ItemPotionCategories, ItemPotionMeta } from './types'

import { Effect } from '../../../../types/Effect'

import { uuidGenerator } from '../../../utils/uuidGenerator'

class ItemPotion extends Item {
  public readonly meta: ItemPotionMeta
  public readonly type: ItemPotionType
  public readonly category: ItemPotionCategories
  public readonly effects: Effect[]

  constructor(props: ItemPotionProps) {
    const { category, effects, meta } = props
    super(props)

    this.type = 'Potion'
    this.meta = meta
    this.category = category
    this.effects = effects
  }

  get uuid(): string {
    return uuidGenerator([['ID', this.id]])
  }
}

export default ItemPotion
