import { ItemProps } from '../Item/types'

export type ItemCraftMaterialType = 'CraftMaterial'

export type ItemCraftMaterialCategories =
  | 'CraftMaterial:Wood'
  | 'CraftMaterial:Iron'
  | 'CraftMaterial:Herb'

export interface ItemCraftMaterialMeta {
  readonly name: string
  readonly quality: string
}

export interface ItemCraftMaterialProps extends ItemProps {
  readonly type: ItemCraftMaterialType
  readonly meta: ItemCraftMaterialMeta
  readonly category: ItemCraftMaterialCategories
}
