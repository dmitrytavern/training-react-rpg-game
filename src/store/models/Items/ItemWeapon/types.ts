import { ItemProps } from '../Item/types'
import { Effect } from '../../../../../types/Effect'

export type ItemWeaponType = 'Weapon'

export type ItemWeaponCategories = 'Weapon:Sword'

export interface ItemWeaponMeta {
  readonly name: string
  readonly quality: string
}

export interface ItemWeaponProps extends ItemProps {
  readonly meta: ItemWeaponMeta
  readonly type: ItemWeaponType
  readonly category: ItemWeaponCategories
  readonly effects: Effect[]
}
