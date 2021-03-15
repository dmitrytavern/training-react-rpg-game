import Item, {ItemProps} from "../Item"
import {Effect} from "../../../../types/Effect"

export interface ItemPotionProps extends ItemProps {
	effects: Effect[]
}

class ItemPotion extends Item {
	public effects: Effect[]

	constructor(props: ItemPotionProps) {
		super(props)

		this.effects = props.effects
	}
}

export default ItemPotion
