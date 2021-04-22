import { ItemTypes, ItemTypeCategories, ItemProps } from './types'

abstract class Item {
  public readonly id: number

  abstract readonly meta: any
  abstract readonly type: ItemTypes
  abstract readonly category: ItemTypeCategories

  abstract get uuid(): string

  protected constructor(props: ItemProps) {
    this.id = props.id
  }
}

export default Item
