import { ItemProps } from '../Item/types'

export type ItemCraftToolType = 'CraftTool'

export type ItemCraftToolCategories = 'CraftTool:Hammer'

export interface ItemCraftToolMeta {
  readonly name: string
  readonly quality: string
}

export interface ItemCraftToolProps extends ItemProps {
  readonly type: ItemCraftToolType
  readonly meta: ItemCraftToolMeta
  readonly category: ItemCraftToolCategories
}
