import Item, {ItemProps} from "../Item"
import {Effect} from "../../../../types/Effect"

export interface ItemArmorProps extends ItemProps {
	effects: Effect[]
}

class ItemArmor extends Item {
	public effects: Effect[]

	constructor(props: ItemArmorProps) {
		super(props)

		this.effects = props.effects
	}
}

export default ItemArmor
