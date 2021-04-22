import Item from '../Item'

import {
  ItemCraftMaterialType,
  ItemCraftMaterialCategories,
  ItemCraftMaterialProps,
  ItemCraftMaterialMeta,
} from './types'

import { uuidGenerator } from '../../../utils/uuidGenerator'

class ItemCraftMaterial extends Item {
  public meta: ItemCraftMaterialMeta
  public type: ItemCraftMaterialType
  public category: ItemCraftMaterialCategories

  constructor(props: ItemCraftMaterialProps) {
    const { meta, category } = props
    super(props)

    this.type = 'CraftMaterial'
    this.meta = meta
    this.category = category
  }

  get uuid(): string {
    return uuidGenerator([['ID', this.id]])
  }
}

export default ItemCraftMaterial
