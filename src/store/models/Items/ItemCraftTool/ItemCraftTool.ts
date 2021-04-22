import Item from '../Item'

import {
  ItemCraftToolType,
  ItemCraftToolCategories,
  ItemCraftToolProps,
  ItemCraftToolMeta,
} from './types'

import { uuidGenerator } from '../../../../utils/uuidGenerator'

class ItemCraftTool extends Item {
  public meta: ItemCraftToolMeta
  public type: ItemCraftToolType
  public category: ItemCraftToolCategories

  constructor(props: ItemCraftToolProps) {
    const { meta, category } = props
    super(props)

    this.type = 'Craft'
    this.meta = meta
    this.category = category
  }

  get uuid(): string {
    return uuidGenerator([['ID', this.id]])
  }
}

export default ItemCraftTool
