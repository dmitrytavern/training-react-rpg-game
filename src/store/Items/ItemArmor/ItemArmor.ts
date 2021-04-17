import Item, { ItemProps } from '../Item'
import { Effect } from '../../../../types/Effect'

export interface ItemArmorProps extends ItemProps {
  readonly effects: Effect[]
}

class ItemArmor extends Item {
  public readonly effects: Effect[]

  constructor(props: ItemArmorProps) {
    super(props)

    this.effects = props.effects
  }
}

export default ItemArmor
