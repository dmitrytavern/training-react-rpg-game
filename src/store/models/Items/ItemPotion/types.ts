import { ItemProps } from '../Item/types'
import { Effect } from '../../../../../types/Effect'

export type ItemPotionType = 'Potion'

export type ItemPotionCategories = 'Potion:Health' | 'Potion:Energy'

export interface ItemPotionMeta {
  readonly name: string
  readonly quality: string
}

export interface ItemPotionProps extends ItemProps {
  readonly meta: ItemPotionMeta
  readonly category: ItemPotionCategories
  readonly effects: Effect[]
}
