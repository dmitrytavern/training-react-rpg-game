import { ItemProps } from '../Item/types'
import { Effect } from '../../../../types/Effect'

export type ItemArmorType = 'Armor'

export type ItemArmorCategories =
  | 'Armor:Helmet'
  | 'Armor:Armor'
  | 'Armor:Arms'
  | 'Armor:Feet'
  | 'Armor:Waist'
  | 'Armor:Ring'

export interface ItemArmorMeta {
  readonly name: string
  readonly quality: string
}

export interface ItemArmorProps extends ItemProps {
  readonly meta: ItemArmorMeta
  readonly type: ItemArmorType
  readonly category: ItemArmorCategories
  readonly effects: Effect[]
}
